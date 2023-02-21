import { useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'


const Filter = () => {

    const dispatch = useDispatch()

    const handleChange = (e) => {
      console.log(e.target.value)
      dispatch(filter(e.target.value))
    }
    
    return (
        <div>
            filter: <input name='filter' onChange={handleChange} />
        </div>
    )
    
}

export default Filter