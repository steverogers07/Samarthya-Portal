import 'package:flutter/material.dart';

class EditProfile extends StatefulWidget {
  String title;
  String description;
  @override
  _EditProfileState createState() => _EditProfileState();
}

class _EditProfileState extends State<EditProfile> {
  final nameController = new TextEditingController();

  final phoneController = new TextEditingController();

  final schoolIdController = new TextEditingController();
  final schoolNameController = new TextEditingController();
  final schoolRegionController = new TextEditingController();
  final memberController = new TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Profile"),
      ),
      body: SingleChildScrollView(
        child: Container(
          child: Column(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.only(
                    left: 8.0, right: 8.0, top: 8.0, bottom: 3.0),
                child: TextField(
                  controller: nameController,
                  decoration: InputDecoration(
                    border: new OutlineInputBorder(
                      //borderRadius: new BorderRadius.circular(15.0),
                      borderSide: new BorderSide(),
                    ),
                    labelText: "Name",
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(
                    left: 8.0, right: 8.0, top: 8.0, bottom: 3.0),
                child: TextField(
                  controller: phoneController,
                  decoration: InputDecoration(
                    border: new OutlineInputBorder(
                      //borderRadius: new BorderRadius.circular(15.0),
                      borderSide: new BorderSide(),
                    ),
                    labelText: "Phone",
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(
                    left: 8.0, right: 8.0, top: 8.0, bottom: 3.0),
                child: TextField(
                  controller: schoolIdController,
                  decoration: InputDecoration(
                    border: new OutlineInputBorder(
                      //borderRadius: new BorderRadius.circular(15.0),
                      borderSide: new BorderSide(),
                    ),
                    labelText: "School ID",
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(
                    left: 8.0, right: 8.0, top: 8.0, bottom: 3.0),
                child: TextField(
                  controller: schoolNameController,
                  decoration: InputDecoration(
                    border: new OutlineInputBorder(
                      //borderRadius: new BorderRadius.circular(15.0),
                      borderSide: new BorderSide(),
                    ),
                    labelText: "School Name",
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(
                    left: 8.0, right: 8.0, top: 8.0, bottom: 3.0),
                child: TextField(
                  controller: schoolRegionController,
                  decoration: InputDecoration(
                    border: new OutlineInputBorder(
                      //borderRadius: new BorderRadius.circular(15.0),
                      borderSide: new BorderSide(),
                    ),
                    labelText: "School Region",
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(
                    left: 8.0, right: 8.0, top: 8.0, bottom: 3.0),
                child: TextField(
                  controller: memberController,
                  decoration: InputDecoration(
                    border: new OutlineInputBorder(
                      //borderRadius: new BorderRadius.circular(15.0),
                      borderSide: new BorderSide(),
                    ),
                    labelText: "No of members",
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
