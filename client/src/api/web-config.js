const Webconfig = {
    "rootUrl":"http://localhost:5000",

    // Admin //
    getAllAdmin: function(){
        return this.rootUrl+`/admins`
    },

    getAdminById: function(id) {
        return this.rootUrl+`/admins/getById${id}`
    },

    getAdminByUsername: function(username) {
        return this.rootUrl+`/admins/getByUsername/${username}`
    },

    blockStudent: function(id) {
        return this.rootUrl+`/admins/blockStudent/${id}`
    },

    unblockStudent: function(id) {
        return this.rootUrl+`/admins/unblockStudent/${id}`
    },


    // Student //
    getAllStudents: function() {
        return this.rootUrl+`/students`
    },

    getAllSubjects: function() {
        return this.rootUrl+`/subjects`
    },

    getStudentById: function(id) {
        return this.rootUrl+`/students/getById/${id}`
    },

    getStudentByUsername: function(username) {
        return this.rootUrl+`/students/getByUsername/${username}`
    },

    getLastStudentId: function() {
        return this.rootUrl+`/students/getLastStudentId`
    },

    insertStudent: function() {
        return this.rootUrl+`/students/insert`
    },

    updateStudentById: function(id) {
        return this.rootUrl+`/students/updateById/${id}`
    },


    // Teacher //
    getAllTeachers: function() {
        return this.rootUrl+`/teachers`
    },

    getTeacherById: function(id) {
        return this.rootUrl+`/teachers/getById/${id}`
    },

    getTeacherByUsername: function(username) {
        return this.rootUrl+`/teachers/getByUsername/${username}`
    },

    updateTeacherById: function(id) {
        return this.rootUrl+`/teachers/updateById/${id}`
    },


    // Subject //
    getAllSubjects: function() {
        return this.rootUrl+`/subjects`
    },


    // Message //
    getAllMessages: function() {
        return this.rootUrl+`/messages`
    }

}

export default Webconfig;