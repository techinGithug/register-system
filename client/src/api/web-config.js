const Webconfig = {
    "rootUrl":"http://localhost:3000",

    getAllAdmin: function(){
        return this.rootUrl+"/admin"
    },

    getAllStudents: function() {
        return this.rootUrl+"/students"
    },

    getAllSubjects: function() {
        return this.rootUrl+"/subjects"
    },

    getAllTeachers: function() {
        return this.rootUrl+"/teachers"
    },

    getStudentById: function(id) {
        return this.rootUrl+`/students/?id=${id}`
    },

    getStudentByUsername: function(username) {
        return this.rootUrl+`/students/?username=${username}`
    },

    updateStudentById: function(id) {
        return this.rootUrl+`/students/${id}`
    }

}

export default Webconfig;