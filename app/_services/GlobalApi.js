const { default: axios } = require("axios");

const GetAllGrades=() => axios.get('/api/grade');
const CreateNewStudent = (data) => axios.post('/api/student',data);

const GetAllStudent =() => axios.get('/api/student');

const DeleteStudentRecord=(id)=>axios.delete('/api/student?id='+id);

const GetAttendanceList =(grade,month) => axios.get('/api/attendance?grade='+grade+"&month="+month);

const MarkAttendance=(data)=>axios.post("/api/attendance",data); 

const MarkAttendanceAsAbsent=(studentId,day,date)=> axios.delete("/api/attendance?studentId="+studentId+"&day="+day+"&date="+date);
export default{
    GetAllGrades,
    CreateNewStudent,
    GetAllStudent,
    DeleteStudentRecord,
    GetAttendanceList,
    MarkAttendance,
    MarkAttendanceAsAbsent
}