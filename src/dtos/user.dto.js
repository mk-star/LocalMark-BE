class UserDTO {
    constructor({ loginId, email, password, name, nickname, type, status }) {
        this.loginId = loginId;
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.type = type;
        this.status = status;
    }
}

export default UserDTO;
