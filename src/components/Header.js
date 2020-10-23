/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */

import React, { useState } from 'react'

function Header() {
  const [modalActive, setModalActive] = useState(false)
  const [textEntry, setTextEntry] = useState('')

  const [input, setInput] = useState('')
  const [posts, setPosts] = useState([])
  const [img, setImg] = useState('')
  const [description, setDescription] = useState('')
  const [imgInput, setImgInput] = useState('')


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
    setPosts([...posts, {
      name: input, body: textEntry, id: idct, img,
    }])
    setIdct(idct + 1)
  }

  const savePost = e => {
    setModalActive(false)

    setDescription(textEntry)
    setImg(imgInput)
  }

  const editPost = id => {
    setCurrEdit(id)
    setModalActive(true)
    setInput(posts[id].name)
    setTextEntry(posts[id].body)
    setImg(posts[id].img)
  }

  const showEditHeaderPopup = () => {
    if (idct === 1) {
      editPost(1)
    } else {
      setModalActive(true)
      setCurrEdit(-1)
      setInput('')
      setTextEntry('')
      setImg('')
    }
  }

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <div><button onClick={() => showEditHeaderPopup()} className="header-button">Edit Header</button></div>

      <div className="posts-container">
        <div className="header">
          {img && <img className="header-post-image" src={img} />}
          <div className="body">{description}</div>
        </div>
      </div>

      {modalActive && (
      <div className="modal" onClick={() => setModalActive(false)}>
        <div className="modal-inner" onClick={e => e.stopPropagation()}>
          <h3>Design Header</h3>
          <input onChange={e => setImgInput(e.target.value)} placeholder="Image url..." defaultValue={img} />
          <textarea placeholder="Description..." onChange={e => setTextEntry(e.target.value)} defaultValue={textEntry} />
          {currEdit === -1
            ? <button className="header-button" onClick={() => addPost()}>Update Header</button>
            : (
              <>
                <button className="fancy-button" onClick={() => savePost()}>Save Changes</button>
                <button onClick={() => setModalActive(false)}>Cancel</button>
              </>
            )}
        </div>
      </div>
      )}
    </>
  )
}

export default Header
