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
    addStudentPersonalData: function() {
        return this.rootUrl+`/students/addStudentPersonalData`
    },

    addStudentEducationData: function() {
        return this.rootUrl+`/students/addStudentEducationData`
    },

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

    getStudentByStudentId: function(id) {
        return this.rootUrl+`/students/getStudentByStudentId/${id}`
    },

    checkStudentPersonalData: function(id) {
        return this.rootUrl+`/students/checkStudentPersonalData/${id}`
    },

    checkStudentEducationData: function(id) {
        return this.rootUrl+`/students/checkStudentEducationData/${id}`
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
    },

    // Other //
    checkDuplicateUsername: function(username) {
        return this.rootUrl+`/others/checkDuplicateUsername/${username}`
    },

    checkDuplicateEmail: function(email) {
        return this.rootUrl+`/others/checkDuplicateEmail/${email}`
    },

    getUserDataByUsername: function(username) {
        return this.rootUrl+`/others/getUserDataByUsername/${username}`
    },

    updateUsernameAndPasswordById: function(id) {
        return this.rootUrl+`/others/updateUsernameAndPasswordById/${id}`
    }
}

export default Webconfig;