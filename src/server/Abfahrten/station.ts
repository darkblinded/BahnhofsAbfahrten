/* eslint no-param-reassign: 0, no-await-in-loop: 0 */
import { AxiosInstance } from 'axios';
import { flatten } from 'lodash';
import { IrisStationWithRelated } from 'types/station';
import { noncdAxios } from './helper';
import NodeCache from 'node-cache';
import xmljs from 'libxmljs2';

export type Station = {
  name: string;
  meta: string[];
  eva: string;
  ds100: string;
  db: string;
  creationts: string;
  p: string;
};

// 4 Hours in seconds
const stdTTL = 4 * 60 * 60;
const cache = new NodeCache({ stdTTL });

function parseStation(stationNode: xmljs.Element): Station {
  const station: any = {};

  stationNode.attrs().forEach(a => {
    station[a.name()] = a.value();
  });
  if (station.meta) {
    station.meta = station.meta.split('|');
  } else {
    station.meta = [];
  }

  return station;
}

export async function getSingleStation(
  evaId: string,
  axios: AxiosInstance = noncdAxios
): Promise<Station> {
  const cached = cache.get<Station>(evaId);

  if (cached) {
    return cached;
  }
  const rawXml = (await axios.get(`/station/${evaId}`)).data;

  const xml = xmljs.parseXml(rawXml);

  const xmlStation = xml.get('//station');

  if (!xmlStation) {
    throw {
      status: 404,
      error: {
        type: '404',
        description: 'Unbekannte Station',
      },
    };
  }
  const station = parseStation(xmlStation);

  cache.set(evaId, station);

  return station;
}

export async function getStation(
  evaId: string,
  recursive: number = 0,
  axios?: AxiosInstance
): Promise<IrisStationWithRelated> {
  const station = await getSingleStation(evaId, axios);
  let queue = station.meta;
  const seen = [station.eva];
  const relatedStations: Station[] = [];

  while (recursive > 0 && queue.length) {
    recursive -= 1;
    queue = flatten(
      await Promise.all(
        queue.map(async id => {
          if (seen.includes(id)) {
            return [];
          }
          seen.push(id);
          const station = await getSingleStation(id, axios);

          relatedStations.push(station);

          return station.meta;
        })
      )
    );
  }

  return {
    station,
    relatedStations: relatedStations.sort((s1, s2) =>
      s1.name > s2.name ? 1 : -1
    ),
  };
}
