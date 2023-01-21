import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import MainScreen from "../../components/comman/MainScreen"
import ReactMarkdown from "react-markdown"
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import { noteDeletedAction, updateNoteAction } from '../../redux/action/noteAction'
import {useDispatch, useSelector} from "react-redux"
import Loading from "../../components/Loading"
import ErrorMessage from "../../components/ErrorMessage"

const SingleNote = () => {
    const navigate = useNavigate()
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const  dispatch = useDispatch();

    const updateNote = useSelector(state=>state.updateNote)
    const {error, loading} = updateNote

    const deleteNote = useSelector(state=>state.deleteNote)
    const {error: errorDelete, loading: loadingDelete} = deleteNote

    useEffect(()=>{
        const fetching = async ()=>{
            const {data} = await axios.get(`http://localhost:8080/api/notes/${id}`)
            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setDate(data.updatedAt);
        }
        fetching();
    },[id,date]);    

    const resetHandler = () =>{
        setTitle("");
        setContent("");
        setCategory("");         
    }
    const updateHandler =(e)=>{
        e.preventDefault();
        dispatch(updateNoteAction(id,title,content,category));
         if (!title || !content || !category) return; 
        resetHandler();
        navigate('/mynotes');   
        }


        const deleteHandler = id => {
            if (window.confirm ('Are you sure?')) {
              dispatch(noteDeletedAction(id));
            }
            resetHandler();
            navigate('/mynotes'); 
          };

  return (
    <MainScreen title= "Edit or Delete Note">
        {loadingDelete && <Loading /> }
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {errorDelete && <ErrorMessage>{error}</ErrorMessage>}
        <Card>
            <Card.Header>
                Edit your Note
            </Card.Header>
            <Card.Body>
                <Form onSubmit={updateHandler}>
                    <Form.Group controlId="title" >
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="title" placeholder='Enter the title' value={title} onChange={e => setTitle(e.target.value)}/>
                    </Form.Group>
                    <Form.Group  controlId="content">
                        <Form.Label>Content</Form.Label>
                        <Form.Control type="content" placeholder='Enter the content' value={content} onChange={e => setContent(e.target.value)} />
                    </Form.Group>
                    {content && (
                        <Card>
                            <Card.Header>Note Preview</Card.Header>
                            <Card.Body>
                                <ReactMarkdown>{content}</ReactMarkdown>
                            </Card.Body>
                        </Card>
                    )}
                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type='category' placeholder='Enter the category' value={category} onChange={e=>setCategory(e.target.value)} />
                    </Form.Group>
                    <div className='mt-3'>
                    {loading && <Loading />}
                    <Button variant='primary' type='submit' >Update Note</Button>
                    <Button variant='danger' className='mx-2' onClick={()=>deleteHandler(id)}>Delete Note</Button>
                    </div>
                </Form>
            </Card.Body>
            <Card.Footer>
                Updated At - {date?.substring(0,10)}
            </Card.Footer>
        </Card>
    </MainScreen>
  )
}

export default SingleNote