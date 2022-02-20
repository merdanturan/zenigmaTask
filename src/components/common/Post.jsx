import React, { useState } from 'react'
import '../../assets/scss/components/Post.scss'
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";
import { useSelector } from 'react-redux';

import Eye from '../../assets/img/eye.png'
import Delete from '../../assets/img/delete.png'
import Edit from '../../assets/img/edit.png'

import Modal from '../basic/Modal';
import Input from '../basic/Input';
import Button from '../basic/Button';


const Post = () => {
  //States
  const { user } = useSelector(state => state.auth)
  const [header, setHeader] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState("");
  const [modalIndex, setModalIndex] = useState();
  const [isModalOpen, setModalOpen] = useState(false)

  //Get all posts
  const posts = useLiveQuery(
    () => db.posts.toArray()
  );

  //Post update function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      db.posts.update(modalIndex, {
        header: header,
        content: content,
        createdAt: new Date()
      });
      setHeader("")
      setContent("")
      setModalOpen(false)
      setError("")
      setModalIndex()
    } catch (error) {
      setError(error.message)
    }
  };

  //Modal opener and setting data into modal
  const modalData = (p, key) => {
    setModalOpen(true)
    setHeader(p.header)
    setContent(p.content)
    setModalIndex(key)
  }

  //Post Delete function
  const handleDetele = key => {
    db.posts.delete(key)
  }

  //Function for how many times readed by users on mouse enter to div and once for user
  //do not count if user not logged in 
  const handleRead = async (p) => {
    if (user !== null) {
      try {
        const index = p.readBy.findIndex(el => el === user)
        if (index < 0) {
          db.posts.update(p.post, {
            readBy: [...p.readBy, user]
          });
        }
      } catch (error) {
        setError(error.message)
      }
    }
  }

  return (
    <>
      {posts?.map((p, i) =>
        <div className='postContainer' key={i} onMouseEnter={() => handleRead(p)}>

          <div className='postHeader'>
            <div>{p.header}</div>
            <div className='ml-10'>{p.createdAt.toString().slice(4, 21)}</div>
          </div>

          <div className='postContent'>{p.content}</div>

          <div className='postFooter'>
            <div className='readBy'>
              <img src={Eye} height="18px" alt='e' />
              <div>{p.readBy.length}</div>
            </div>

            {user === p.blogger &&
              <div>
                <img onClick={() => modalData(p, p.post)} src={Edit} height="23px" alt='edit' className='pointer' />
                {" "}
                <img onClick={() => handleDetele(p.post)} src={Delete} height="23px" alt='delete' className='pointer' />
              </div>
            }

            <div>{p.blogger}</div>

          </div>

        </div>
      )}

      <Modal active={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className='formHeader'>
          Edit
        </div>
        <form onSubmit={handleUpdate}>
          {error && <div className='alert'>{error}</div>}
          <Input onChange={v => setHeader(v)} value={header} placeholder={'Header'} required />
          <Input onChange={v => setContent(v)} value={content} placeholder={'Content'} required area />
          <div>
            <Button full submit>Edit</Button>
          </div>
        </form>
      </Modal>

      {posts?.length === 0 && !user &&
        <div>
          <div className='formHeader'>Hello!</div>
          Register to create blog posts!
        </div>
      }

      {posts?.length === 0 && user &&
        <div className='mt-50'>
          Lets create first post ever!
        </div>
      }

    </>
  )
}

export default Post