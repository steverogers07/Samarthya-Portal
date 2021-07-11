import 'dart:convert';
import 'dart:io';
import 'dart:convert' show utf8;

import 'package:http/http.dart';
import 'package:team_79_cfg/models/Department.dart';
import 'package:team_79_cfg/models/GovtOfficial.dart';
import 'package:http/http.dart' as http;
import 'package:team_79_cfg/models/Grievance.dart';
import 'package:team_79_cfg/models/User.dart';
import 'Category.dart';

class DummyData {
  static String language = "English";
  static String SMCId = "60cdf744d26e993ed881b82e";
  static List<Category> getCategories() {
    return [
      Category("Infrastructure", "",
          ["Lack of Classrooms", "Availability of drinking water"]),
      Category("Human Resources", "", ["Teacher vacancies", "Scholarships"]),
      Category("Other", "", [])
    ];
  }

  static List<Category> getHindiCategories() {
    return [
      Category(
          "भूमिuकारूप व्यवस्था", "", ["कक्षाओं की कमी", "पेयजल की उपलब्धता"]),
      Category("मानव संसाधन", "", ["शिक्षक रिक्तियां", "छात्रवृत्ति"]),
      Category("अन्य", "", [])
    ];
  }

  static Future<List<GovtOfficial>> getGovtOfficials() async {
    final response = await http.get(Uri.parse(
        'https://codeforgood2021.herokuapp.com/samarthya/government/read_all_government'));
    List<GovtOfficial> tmp = GovtOfficial.fromJson(jsonDecode(response.body));
    return tmp;
  }

  static Future<void> updateGrievanceStatus(String newStatus) async {
    Object params = {
    "GrievanceId" : "60ce15e28009272e46ee97ee",
    "status" : newStatus
} ;
    final response = await http.post(
        Uri.parse(
            'https://codeforgood2021.herokuapp.com/samarthya/grievance/update_grievance'),
        headers: {
          'Content-type': 'application/json',
        },
        body: jsonEncode(params));
      print(response.body);
  }


  static Future<void> sendEmail(String id) async {
Object params = {
    "GrievanceId" : id,
    "officialId" : "60ce0cdb0a887c277afd696a"
} ;
    final response = await http.post(
        Uri.parse(
            'https://codeforgood2021.herokuapp.com/samarthya/grievance/update_grievance'),
        headers: {
          'Content-type': 'application/json',
        },
        body: jsonEncode(params));
      print(response.body);



    Object params1 = {
    "GrievanceId" : id
} ;
    final response1 = await http.post(
        Uri.parse(
            'https://codeforgood2021.herokuapp.com/samarthya/grievance/send_mail'),
        headers: {
          'Content-type': 'application/json',
        },
        body: jsonEncode(params1));
      print(response1.body);
  }

  static Future<Response> createGrievance(
      Grievance grievance, File file) async {
    List<int> imageBytes = file.readAsBytesSync();
    print(imageBytes);
    String base64Image = base64Encode(imageBytes);
    Object params = json.encode({
      "SMCId": "60cdf744d26e993ed881b82e",
      "category": grievance.category,
      "topic": grievance.topic,
      "issue": grievance.issue,
      "status": grievance.status,
      "pdf": base64Image,
      "officialId":"60ce0cdb0a887c277afd696a",
    });
    print("sending " + params.toString());
    final response = await http.post(
        Uri.parse(
            'https://codeforgood2021.herokuapp.com/samarthya/grievance/create_grievance'),
        headers: {
          'Content-type': 'application/json',
        },
        body: params);
    print(response.body);
    print(jsonDecode(response.body)["data"]["_id"]);
    String id1 = jsonDecode(response.body)["data"]["_id"];
    sendEmail(id1);
    return response;
    //   Map<String,dynamic> value = jsonDecode(response.body);
    // if(value["statusMessage"] == "User inserted successfully") {
    //   print("successful!!");
    //   return "Success";
    // }
  }

  static Future<String> signUp(User user) async {
    Object params = json.encode({
      'username': user.username,
      'email': user.email,
      'password': user.password,
      'UserType': user.UserType,
      'mobile': user.mobile,
      'SchoolId': user.SchoolId,
      'SchoolName': user.SchoolName,
      'SchoolRegion': user.SchoolRegion
    });
    print("sending " + params.toString());
    final response = await http.post(
        Uri.parse(
            'https://codeforgood2021.herokuapp.com/samarthya/user/user_signup'),
        headers: {
          'Content-type': 'application/json',
        },
        body: params);
    print(response.statusCode);
    return (jsonDecode(response.body))["statusMessage"];
    //   Map<String,dynamic> value = jsonDecode(response.body);
    // if(value["statusMessage"] == "User inserted successfully") {
    //   print("successful!!");
    //   return "Success";
    // }
  }

  static Future<List<Grievance>> getGrievances() async {
    final response = await http.get(Uri.parse(
        'https://codeforgood2021.herokuapp.com/samarthya/grievance/read_all_grievances'));
    List<Grievance> tmp = Grievance.fromJson(jsonDecode(response.body));
    return tmp;
  }

  static List<Department> getDepartments() {
    return [
      Department("Education", []),
      Department("Electricity", []),
      Department("Panchayti Raj", []),
      Department("ACP", [])
    ];
  }

  static List<Department> getHindiDepartments() {
    return [
      Department("शिक्षा", []),
      Department("बिजली", []),
      Department("पंचायती राज", []),
      Department("एसीपी", [])
    ];
  }
}
