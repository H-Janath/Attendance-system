const { default: axios } = require("axios");

const GetAllGrades=() => axios.get('/api/grade');
const CreateNewStudent = (data) => axios.post('/api/student',data);

const GetAllStudent =() => axios.get('/api/student');

const DeleteStudentRecord=(id)=>axios.delete('/api/student?id='+id);
export default{
    GetAllGrades,
    CreateNewStudent,
    GetAllStudent,
    DeleteStudentRecord
}