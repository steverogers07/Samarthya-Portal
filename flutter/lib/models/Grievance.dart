class Grievance {
  String issue;
  String topic;
  String category;
  String department;
  String status;
  String SMCId;
  DateTime createdAt;

  Grievance(
    this.issue,
    this.topic,
    this.category,
    this.department,
    this.status,
    this.SMCId,
    this.createdAt
  );
  static List<Grievance> fromJson(Map<String, dynamic> json) {
    List<Grievance> tmp = [];
    for (var item in json["data"]) {
      tmp.add(Grievance(
        item["issue"],
        item["topic"],
        item["category"],
        item["department"],
        item["status"],
        item["SMCId"],
        item["createdAt"]
        ));
    }
    return tmp;
  }
}
