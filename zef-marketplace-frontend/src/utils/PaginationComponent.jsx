import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const PaginationComponent = ({pages , page}) => {

  // const search = `/search/${keyWord}`;
  // const link = keyWord ? `${search}/page`  : `/page`;
  return (
    <Pagination>
        <LinkContainer to={`/${page - 1}`}>
        <Pagination.Prev disabled={page === 1}/>
        </LinkContainer>
        {[...Array(pages).keys()].map(x => 
        <LinkContainer key={x + 1} to={`/${x + 1}`}>
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
        )}

        <LinkContainer to={`/${page + 1}`}>
     <Pagination.Next disabled={page === pages}/>
     </LinkContainer>

      </Pagination>
  )
}

export default PaginationComponent