import React from 'react';
import Link from './link';

import { StyledNextPrevious } from './styles/PageNavigationButtons';

const NextPrevious = ({ mdx, nav }) => {

  console.error("ERROR: NextPrevious.js is not implemented");
  let currentIndex;
  nav.unshift({
    parent: null,
    title: 'Welcome to the mimik Developer Documentation',
    url: '/'
  })

  nav.map((el, index) => {

    if (el && el.url === mdx.fields.slug) {
      currentIndex = index
    }
    return false;
  });

  const nextInfo = {};

  const previousInfo = {};

  if (currentIndex === undefined) {
    // index
    if (nav[0]) {
      nextInfo.url = nav[0].url;
      nextInfo.title = nav[0].title;
    }
    previousInfo.url = null;
    previousInfo.title = null;
    currentIndex = -1;
  } else if (currentIndex === 0) {
    // first page
    nextInfo.url = nav[currentIndex + 1] ? nav[currentIndex + 1].url : null;
    nextInfo.title = nav[currentIndex + 1] ? nav[currentIndex + 1].title : null;
    previousInfo.url = null;
    previousInfo.title = null;
  } else if (currentIndex === nav.length - 1) {
    // last page
    nextInfo.url = null;
    nextInfo.title = null;
    previousInfo.url = nav[currentIndex - 1] ? nav[currentIndex - 1].url : null;
    previousInfo.title = nav[currentIndex - 1] ? nav[currentIndex - 1].title : null;
  } else if (currentIndex) {
    // any other page
    nextInfo.url = nav[currentIndex + 1].url;
    nextInfo.title = nav[currentIndex + 1].title;
    if (nav[currentIndex - 1]) {
      previousInfo.url = nav[currentIndex - 1].url;
      previousInfo.title = nav[currentIndex - 1].title;
    }
  }

  return (
    <StyledNextPrevious>
      {previousInfo.url && currentIndex >= 0 ? (
        <Link to={nav[currentIndex - 1].url} className={'previousBtn'}>

          <div className={'preRightWrapper'}>
            <div className={'smallContent'}>

              <svg width="27" height="16" viewBox="0 0 27 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.9231 9C26.4754 9 26.9231 8.55228 26.9231 8C26.9231 7.44772 26.4754 7 25.9231 7L25.9231 9ZM0.29291 7.29289C-0.0976143 7.68342 -0.0976143 8.31658 0.29291 8.7071L6.65687 15.0711C7.04739 15.4616 7.68056 15.4616 8.07108 15.0711C8.46161 14.6805 8.46161 14.0474 8.07108 13.6569L2.41423 8L8.07109 2.34314C8.46161 1.95262 8.46161 1.31946 8.07109 0.928931C7.68056 0.538406 7.0474 0.538406 6.65687 0.928931L0.29291 7.29289ZM25.9231 7L1.00002 7L1.00002 9L25.9231 9L25.9231 7Z" fill="currentColor" className="_13gjrqj" />
              </svg>
              <span>Previous</span>
            </div>
            <div className={'nextPreviousTitle'}>
              <span>{nav[currentIndex - 1].title}</span>
            </div>
          </div>
        </Link>
      ) :
        <div></div>
      }
      {nextInfo.url && currentIndex >= 0 ? (
        <Link to={nav[currentIndex + 1].url} className={'nextBtn'}>
          <div className={'nextRightWrapper'}>
            <div className={'smallContent'}>
              <span>Next</span>
              <svg width="27" height="16" viewBox="0 0 27 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7C0.447715 7 5.46974e-08 7.44772 0 8C-5.46974e-08 8.55228 0.447715 9 1 9L1 7ZM26.6302 8.70711C27.0207 8.31658 27.0207 7.68342 26.6302 7.2929L20.2662 0.928934C19.8757 0.538409 19.2425 0.538409 18.852 0.928934C18.4615 1.31946 18.4615 1.95262 18.852 2.34315L24.5089 8L18.852 13.6569C18.4615 14.0474 18.4615 14.6805 18.852 15.0711C19.2425 15.4616 19.8757 15.4616 20.2662 15.0711L26.6302 8.70711ZM1 9L25.9231 9L25.9231 7L1 7L1 9Z" fill="currentColor" className="_13gjrqj" />
              </svg>
            </div>
            <div className={'nextPreviousTitle'}>
              <span>{nav[currentIndex + 1] && nav[currentIndex + 1].title}</span>
            </div>
          </div>

        </Link>
      ) : null}
    </StyledNextPrevious>
  );
};

export default NextPrevious;
