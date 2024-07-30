class UserDTO {
    constructor({ email, password, name, nickname, phone, birth, type, status }) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.phone = phone;
        this.birth = birth;
        this.type = type;
        this.status = status;
    }
}

module.exports = UserDTO;
