import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import NewBlogForm from './NewBlogForm'
import Blogs from './Blogs'
import '../index.css'



const BlogsTabs = ({ blogs, createBlog }) => {
  return (
    <Tabs
      defaultActiveKey="blogs"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="blogs" title="Blogs" className='tab'>
        <Blogs blogs={blogs} />
      </Tab>
      <Tab eventKey="newBlog" title="Create New" className='tab'>
        <NewBlogForm  createBlog={createBlog}/>
      </Tab>
    </Tabs>
  )
}

export default BlogsTabs
