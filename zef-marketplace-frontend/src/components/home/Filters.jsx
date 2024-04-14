import { Button, Form} from 'react-bootstrap';

const Filters = ({categories , onCategoryFilter ,categoryFilter , onAgeFilter , ageFilter , onResetFilters }) => {
  return (
<>
  <h2>Filters</h2>
  <Form>
  <h5>Categories</h5>
      {categories?.map((category) => 
        <Form.Check key={category?._id} className='d-flex align-items-center gap-1' >
          <Form.Check.Input
          onClick={() => onCategoryFilter(category?._id)}
            type="checkbox"
            id={category?._id}
            className='my-3'
            checked={categoryFilter.includes(category?._id)}
          />
          <Form.Check.Label htmlFor={category?._id}>{category?.name}</Form.Check.Label>
        </Form.Check>
      )}

      <h5 className='mt-3'>Age</h5>
      {
        ["0-3" , "4-6" , "7-10"].map((age) =>
        <Form.Check key={age} className='d-flex align-items-center gap-1' >
          <Form.Check.Input
          onClick={() => onAgeFilter(age)}
            type="radio"
            id={age}
            className='my-3'
            name='444'
            checked={ageFilter.includes(age)}
          />
          <Form.Check.Label htmlFor={age}>{age} Years Old</Form.Check.Label>
        </Form.Check>

        )
      }
  

    </Form>

    <Button className='mb-3' onClick={onResetFilters} type="button" >Reset filters</Button>
</>
  )
}

export default Filters;