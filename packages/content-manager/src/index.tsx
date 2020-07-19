import React, { useEffect } from 'react';
import { useBuckets } from './hooks';
import { LinksObject } from './buckets';

interface ContentManagerProps {
  bucketName: string;
  userApiKey: string;
  userApiSecret: string;
}

export function ContentManager({
  bucketName,
  userApiKey,
  userApiSecret,
}: ContentManagerProps) {
  useEffect(() => {
    localStorage.clear()
  }, [])

  const hookData = useBuckets({userApiKey, userApiSecret, bucketName })

  console.log({ ...hookData });

  return (
    <Wrapper>
      {hookData.isLoading && <p>Loading data...</p>}
      {!hookData.isLoading && typeof hookData.bucketLinks !== 'undefined' && (
        <ListOfLinks bucketLinks={hookData.bucketLinks} />
      )}
    </Wrapper>
  );
}

interface WrapperProps extends React.PropsWithChildren<{}> {}
function Wrapper({ children }: WrapperProps) {
  return (
    <div>
      <h1>Content manager</h1>
      {children}
    </div>
  );
}

interface ListOfLinksProps {
  bucketLinks: LinksObject | null;
}
function ListOfLinks({ bucketLinks }: ListOfLinksProps) {
  const links = bucketLinks !== null ? Object.entries(bucketLinks) : [];

  if (links.length === 0) {
    return <p>No links to display, mate</p>;
  }

  return (
    <ul>
      {links.map(([linkType, link], idx) => (
        <li key={idx}>
          {linkType}:{' '}
          <a href={link} target="_blank">
            {link}
          </a>
        </li>
      ))}
    </ul>
  );
}