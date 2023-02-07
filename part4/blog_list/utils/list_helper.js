const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return null
    }
  
    let maxLikes = 0
    let favoriteBlog = null
    blogs.forEach(blog => {
      if (blog.likes > maxLikes) {
        maxLikes = blog.likes
        favoriteBlog = blog
      }
    })
  
    return {
      title: favoriteBlog.title,
      author: favoriteBlog.author,
      likes: favoriteBlog.likes
    }
  }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}