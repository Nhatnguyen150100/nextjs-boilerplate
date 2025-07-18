import * as React from 'react';

interface IVisibilityProps {
  visibility: any;
  children: React.ReactNode;
  boundaryComponent?: boolean;
  suspenseComponent?: React.JSX.Element | React.ReactNode | null;
}

export default function Visibility({
  children,
  visibility,
  boundaryComponent = false,
  suspenseComponent = null,
}: IVisibilityProps): React.ReactElement {
  return (
    <>
      {visibility ? children : boundaryComponent ? <div /> : suspenseComponent}
    </>
  );
}
