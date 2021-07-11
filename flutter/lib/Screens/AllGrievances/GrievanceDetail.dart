import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'package:team_79_cfg/models/Grievance.dart';

class GrievanceDetail extends StatefulWidget {
  @override
  _GrievanceDetailState createState() => _GrievanceDetailState();
}

class _GrievanceDetailState extends State<GrievanceDetail> {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("All Grievances"),
      ),
      body: Container(
        child: Card(
          margin: new EdgeInsets.all(10.0),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15.0),
          ),
          child: new Container(
            padding: EdgeInsets.all(16.0),
            width: 200,
            color: Colors.grey[300],
            child: new Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                new Text(
                  'Title: ',
                  textScaleFactor: 1.5,
                ),
                new SizedBox(
                  height: 8.0,
                ),
                new Text('Category: ', textScaleFactor: 1.25),
                new SizedBox(
                  height: 8.0,
                ),
                new Text('Department: ', textScaleFactor: 1.25),
                new SizedBox(
                  height: 8.0,
                ),
                new Text('Description: ', textScaleFactor: 1.25),
                new SizedBox(
                  height: 8.0,
                ),
                new Text('Status: ', textScaleFactor: 1.25),
                new SizedBox(
                  height: 8.0,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
