

const Filter = ({name, handleChange}) => 
    <div>
        filter shown with: 
        <input value={name} onChange={handleChange} />
    </div>


export default Filter