class User {
  String username;
  String email;
  String password;
  String UserType;
  int mobile;
  String SchoolId;
  String SchoolName;
  String SchoolRegion;

  User(
    this.username,
    this.email,
    this.password,
    this.UserType,
    this.mobile,
    this.SchoolId,
    this.SchoolName,
    this.SchoolRegion
  );

  static User fromJson(Map<String, dynamic> item) {
   User user = 
    User(
        item["username"],
        item["email"],
        item["password"],
        item["UserType"],
        item["mobile"],
        item["SchoolId"],
        item["SchoolName"],
        item["SchoolRegion"]
        );
    return user;
  }

  // Object toJson() {
  //   return {
  //     "username" : username,
  //     "email" :email, 
  //     "password" : password,
  //     "UserType" : UserType,
  //     "mobile" : mobile,
  //     "SchoolId" : SchoolId,
  //     "SchoolName" : SchoolName,
  //     "SchoolRegion" : SchoolRegion
  //   };
  // }
}