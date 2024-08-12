import React from 'react';
import Link from './link';

const TocNode = ({ url, title, items }) => {


  const hasChildren = items.length !== 0;

  let location;

  if (typeof document != 'undefined') {
    location = document.location;
  }


  return (
    <li className='nav_links' style={{ marginTop: "5px" }}>
      {title && (
        <Link to={url} >
          {title}
        </Link>
      )}

      {hasChildren ? (
        <ul className='nav_links' style={{ marginTop: "5px" }} >
          {items.map((item, index) => (
            <TocNode
              key={item.url + index.toString()}
              {...item}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default TocNode;
