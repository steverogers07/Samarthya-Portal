import 'package:flutter/material.dart';
import 'package:team_79_cfg/models/DummyData.dart';
import 'package:team_79_cfg/models/GovtOfficial.dart';

class GovtOfficials extends StatefulWidget {
  @override
  _GovtOfficialsState createState() => _GovtOfficialsState();
}

class _GovtOfficialsState extends State<GovtOfficials> {
  Future<List<GovtOfficial>> _getGrievances() async {
    List<GovtOfficial> officials = [];
    officials = await DummyData.getGovtOfficials();
    return officials;
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Govt Officials"),
      ),
      body: Container(
        child: FutureBuilder(
          future: _getGrievances(),
          builder: (BuildContext context, AsyncSnapshot snapshot) {
            if (snapshot.data == null) {
              return Container(child: Center(child: Text("Loading...")));
            } else {
              return ListView.builder(
                itemCount: snapshot.data.length,
                itemBuilder: (BuildContext context, int index) {
                  return new Card(
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
                            'Name: ' + snapshot.data[index].name,
                            textScaleFactor: 1.5,
                          ),
                          new SizedBox(
                            height: 8.0,
                          ),
                          new Text('Email: ' + snapshot.data[index].email,
                              textScaleFactor: 1.25),
                                 new Text('Authority: ' + snapshot.data[index].authority,
                              textScaleFactor: 1.25),
                              new Text('Phone: ' + snapshot.data[index].phone.toString(),
                              textScaleFactor: 1.25),
                                 new Text('Region: ' + snapshot.data[index].region.toString(),
                              textScaleFactor: 1.25),
                          // new SizedBox(
                          //   height: 8.0,
                          // ),
                        ],
                      ),
                    ),
                  );
                },
              );
            }
          },
        ),
      ),
    );
  }
}
