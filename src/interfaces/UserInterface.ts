export interface UserInterface {
    id: Number,
    first_name:String,
    last_name:String,
    username:String,
    password:String,
    role_type: RoleType
}
enum RoleType {
    admin="admin",
    client="client"
}