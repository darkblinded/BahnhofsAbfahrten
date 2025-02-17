import { RouteComponentProps } from 'react-router';
import Details from 'Common/Components/Details';
import React from 'react';
import useQuery from 'Common/hooks/useQuery';

interface Props
  extends RouteComponentProps<{ train: string; initialDeparture?: string }> {}

const DetailsRoute = ({
  match: {
    params: { train, initialDeparture },
  },
}: Props) => {
  const query = useQuery();

  return (
    <Details
      train={train}
      initialDeparture={initialDeparture}
      currentStopId={query.stop}
    />
  );
};

export default DetailsRoute;
