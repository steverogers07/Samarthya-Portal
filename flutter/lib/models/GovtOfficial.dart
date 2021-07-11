class GovtOfficial {
  String name;
  String email;
  String designation;
  String authority;
  int phone;
  String region;

  GovtOfficial( this.name, this.email,this.designation,this.authority,this.phone,this.region);

  static List<GovtOfficial> fromJson(Map<String, dynamic> json) {
    List<GovtOfficial> tmp = [];
    for (var item in json["data"]) {
      tmp.add(GovtOfficial(
        item["name"], 
        item["email"],
        item["designation"],
        item["authority"],
        item["phone"],
        item["region"]));
    }
    return tmp;
  }

}
