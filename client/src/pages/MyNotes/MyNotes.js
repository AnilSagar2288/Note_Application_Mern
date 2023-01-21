import React, {useEffect} from 'react';
import {Accordion, Badge, Button, Card} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import './MyNoteCss.css';
import MainScreen from '../../components/comman/MainScreen';
import { useDispatch, useSelector } from "react-redux";
import { listNotes, noteDeletedAction } from '../../redux/action/noteAction';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const MyNotes = () => {
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const noteList = useSelector((state)=>state.noteList)
  const {error,loading, notes} = noteList
  
  const userLogin = useSelector((state)=>state.userLogin)
  const {userInfo} = userLogin

  const createNote = useSelector((state) => state.createNote);
  const { success:successCreate } = createNote;

  const updateNote = useSelector((state) => state.updateNote);
  const { success:successUpdate } = updateNote;

  const deleteNote = useSelector((state) => state.deleteNote);
  const { success:successDelete } = deleteNote;


  useEffect (() => {
    dispatch(listNotes());
    if(!userInfo){
      navigate('/');
    }
  }, [dispatch,navigate,userInfo,successCreate,successUpdate,successDelete]);


  // const str = userInfo.name;
  // const newStr = userInfo.name.split(" ").map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(" ")


  
  const deleteHandler = id => {
    if (window.confirm ('Are you sure?')) {
      dispatch(noteDeletedAction(id));
    }
  };
  return (
    <MainScreen title={`Welcome back ${userInfo.name.split(" ").map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(" ")}...`}>
      <Link to="/createnote">
        <Button variant="primary" size="lg">Create New Note</Button>
      </Link>
      {loading && <Loading sendInfo="info" />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      <div className="mt-3">
        <Accordion flush>
          {notes?.reverse().map (note => {
            return <Accordion.Item eventKey={note._id} key={note._id}>
            <Card className="mb-2">
              <Accordion.Header style={{display: 'flex'}}>
                <span
                  style={{
                    flex: 1,
                    color: 'black',
                    cursor: 'pointer',
                    alignSelf: 'center',
                    fontSize: 18,
                  }}
                >
                  {note.title}
                </span>
                <div>
                  <Link to={`/note/${note._id}`}>
                    <Button variant="primary">Edit</Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler (note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Accordion.Header>
              <Accordion.Body>

                <h5>
                  <Badge bg="success" pill>
                    Category - {note.category}
                  </Badge>
                </h5>
                <blockquote className="blockquote mb-0">
                  <p>
                    {note.content}
                  </p>
                  <footer className="blockquote-footer">
                    Create on -Date &nbsp;
                    <cite title='Source Title'>
                      {note.createdAt.substring(0,10)}
                    </cite>
                  </footer>
                </blockquote>
              </Accordion.Body>
            </Card>
          </Accordion.Item>
          })}
        </Accordion>

        {/* {
        notes.map(note=>{
          return (
            <Accordion>
            <Card style={{marginBlockStart:10}}>
                <Card.Header style={{display:"flex"}}>
                  <span style={{flex:1, color:"black", cursor:"pointer", alignSelf:"center", fontSize:18}}>
                    {note.title}
                    </span>
                  <div>
                    <Link to={`/notes/${note._id}`}> <Button variant='primary' >Edit</Button></Link>
                    <Button variant='danger' className='mx-2' onClick={()=>deleteHandler(note._id)}>Delete</Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey='0'>
                <Card.Body>
                  <h5>
                    <Badge bg="success" pill >
                      Category - {note.category}
                    </Badge>
                  </h5>
                <blockquote className="blockquote mb-0">
                  <p>
                    {note.content}
                  </p>
                  <footer className="blockquote-footer">
                    Create on -Date
                  </footer>
                </blockquote>
              </Card.Body>
              </Accordion.Collapse>
            </Card>
            </Accordion>
          )
        })
      } */}
      </div>
    </MainScreen>
  );
};

export default MyNotes;
