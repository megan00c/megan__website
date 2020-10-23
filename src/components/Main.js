import React, { useState } from 'react'


function Main() {
  const [modalActive, setModalActive] = useState(false)
  const [textEntry, setTextEntry] = useState('')

  const [input, setInput] = useState('')
  const [posts, setPosts] = useState([])
  const [img, setImg] = useState('')

  const [currEdit, setCurrEdit] = useState(-1)

  const [idct, setIdct] = useState(0)

  const updateTextArea = e => {
    setTextEntry(e.target.value)
  }

  const updateInput = e => {
    setInput(e.target.value)
  }

  const updateImg = e => {
    setImg(e.target.value)
  }

  const addPost = e => {
    setModalActive(false)
    setPosts([...posts, { name: input, body: textEntry, id: idct, img: img }])
    setIdct(idct + 1)
  }

  const showAddPostPopup = () => {
    setModalActive(true)
    setCurrEdit(-1)
    setInput('')
    setTextEntry('')
    setImg('')
  }

  const savePost = e => {
    setModalActive(false)
    const newPosts = posts.map(post => {
      if (post.id !== currEdit) {
        return post
      } else {
        return { name: input, body: textEntry, id: post.id, img: img }
      }
    })
    // console.log(newPosts)
    setPosts(newPosts)
    // setCurrEdit(-1)
    // setIdct(idct+1);
  }

  const deletePost = id => {
    setPosts(posts.filter(item => item.id !== id))
  }

  const editPost = id => {
    setCurrEdit(id)
    setInput(posts[id].name)
    setTextEntry(posts[id].body)
    setImg(posts[id].img)
    setModalActive(true)
  }

  return (
    <>
      <h2>You can add posts below here</h2>
      <div><button onClick = {() => showAddPostPopup()} className = "fancy-button">Add a post</button></div>
      <div className="posts-container">
      {
        posts.map(post =>
          (
            <div className = "post">
              <img className="post-image" src={post.img} />
              <div className="post-title">{post.name}</div>
              <div className="body">{post.body}</div>
              <button onClick={() => editPost(post.id)}>Edit post</button>
              <button onClick={() => deletePost(post.id)}>Delete post</button>
            </div>
          ))
      }
      </div>
      {modalActive && <div className="modal" onClick  = {() => setModalActive(false)}>
        <div className = "modal-inner" onClick = {e => e.stopPropagation()}>
          <h3>Create a post</h3>
          <input onChange={e => updateInput(e)} placeholder = "Title" defaultValue = {input} />
          <input onChange={e => updateImg(e)} placeholder = "Image url..." defaultValue = {img} />
          <textarea placeholder = "Description..." onChange={e => updateTextArea(e)} defaultValue = {textEntry} />
          {currEdit === -1
            ? <button className = "fancy-button" onClick = {() => addPost()}>Submit post</button>
            :            <>
              <button className = "fancy-button" onClick ={() => savePost()}>Save post</button>
              <button onClick={() => setModalActive(false)}>Cancel</button>
            </>
          }
        </div>
      </div>}
    </>
  )
}

export default Main
