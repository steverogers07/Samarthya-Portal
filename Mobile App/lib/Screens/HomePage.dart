import 'package:flutter/material.dart';
import 'package:team_79_cfg/Screens/GrievanceForm/GrievanceForm.dart';
import 'package:team_79_cfg/Screens/AllGrievances/AllGrievances.dart';
import 'package:team_79_cfg/Screens/Departments/AllDepartments.dart';
import 'package:team_79_cfg/Screens/Profile/EditProfile.dart';
import 'package:team_79_cfg/models/DummyData.dart';

import 'GrievanceForm/HindiGrievanceForm.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<bool> isSelected = [true, false];

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        // Add a ListView to the drawer. This ensures the user can scroll
        // through the options in the drawer if there isn't enough vertical
        // space to fit everything.
        children: <Widget>[
           Padding(
             padding: const EdgeInsets.all(8.0),
             child: ToggleButtons(
                  borderColor: Colors.black,
                  fillColor: Colors.green,
                  borderWidth: 2,
                  selectedBorderColor: Colors.black,
                  selectedColor: Colors.white,
                  borderRadius: BorderRadius.circular(0),
                  children: <Widget>[
                      Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text(
                          'English',
                          style: TextStyle(fontSize: 16),
                      ),
                      ),
                      Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text(
                          'हिंदी',
                          style: TextStyle(fontSize: 16),
                      ),
                      ),
                  ],
                  onPressed: (int index) {
                      setState(() {
                         for (int i = 0; i < isSelected.length; i++) {
                          isSelected[i] = i == index;
                      }
                     if(DummyData.language == "English") {
                       DummyData.language = "Hindi";
                     } else {
                       DummyData.language = "English";
                     }
                     print(DummyData.language);
                      });
                  },
                  isSelected: isSelected,
                  ),
           ),
          DummyData.language == "English" ? Padding(
            padding: EdgeInsets.all(3.0),
            child: ListTile(
                tileColor: Colors.lightBlue[100],
                title: Text('एक अनुरोध उठाओ'),
                onTap: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => HindiGrievanceForm()));
                }
                // Update the state of the ap
                // p.
                // ...
                ),
          ):
          ListTile(
              title: Text('Raise Grievance'),
              onTap: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => GrievanceForm()));
              }
              // Update the state of the ap
              // p.
              // ...
              ) ,
          Padding(
            padding: const EdgeInsets.all(3.0),
            child: ListTile(
              tileColor: Colors.lightGreen[100],
              title: Text(DummyData.language == "Hindi" ? 'My Grievances' : 'मेरी शिकायतें'),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => AllGrievances()),
                );
              },
            ),),
            Padding(
              padding: const EdgeInsets.all(3.0),
              child: ListTile(
                tileColor: Colors.red[100],
                title: Text(DummyData.language == "Hindi" ? 'Edit Profile' : 'प्रोफ़ाइल संपादित करें'),
                onTap: () {
                   Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => EditProfile()),
                  );
                  // Update the state of the app.
                  // ...
                },
              ),
            ),
          Padding(
            padding: const EdgeInsets.all(3.0),
            child: ListTile(
              tileColor: Colors.purple[100],
              title: Text(DummyData.language == "Hindi" ? 'View Govt officials details' : 'अधिकारियों का विवरण देखें'),
              onTap: () {
                // Update the state of the app.
                // ...
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => AllDepartments()),
                );
              },
            ),
          ),
        ],
      ),
      appBar: AppBar(),
    );
  }
}
