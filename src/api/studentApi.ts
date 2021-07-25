import { ListResponse, Params, Student } from "models";
import axiosClient from "./axios";

export default {
   getStudents(params: Params): Promise<ListResponse<Student>> {
      return axiosClient.get("students", { params })
   },
   getStudent(id: string): Promise<Student> {
      return axiosClient.get(`students/${id}`)
   },
   addStudent(params: Student): Promise<Student> {
      return axiosClient.post("students", params)
   },
   updateStudent(params: Student): Promise<Student> {
      return axiosClient.patch("students", params)
   },
   removeStudent(id: string): Promise<any> {
      return axiosClient.delete(`students/${id}`)
   },
}