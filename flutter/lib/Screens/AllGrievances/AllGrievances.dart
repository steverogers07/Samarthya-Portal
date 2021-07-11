import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:team_79_cfg/Screens/AllGrievances/GrievanceTimeline.dart';
import 'package:team_79_cfg/models/DummyData.dart';

import 'package:team_79_cfg/models/Grievance.dart';

class AllGrievances extends StatefulWidget {
  List<Grievance> grievances = [];
  @override
  _AllGrievancesState createState() => _AllGrievancesState();
}

class _AllGrievancesState extends State<AllGrievances> {
  
  Future<List<Grievance>> _getGrievances() async {
    //var data = await http.get("");

    //var jsonData = json.decode(data.body);

    List<Grievance> grievances = [];
    grievances = await DummyData.getGrievances();

    setState(() {
      widget.grievances = grievances;
    });
    // print(jsonData);

    return grievances;
  }

@override
  void initState() {
    // TODO: implement initState
    super.initState();
    _getGrievances();
  }
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("All Grievances"),
      ),
      body: Container(
        child: widget.grievances == null ? Container() : ListView.builder(
                itemCount: widget.grievances == null ? 0 : widget.grievances.length,
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
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              new Text(
                                widget.grievances[index].topic,
                                textScaleFactor: 1.5,
                              ),
                              IconButton(
                                icon: Icon(Icons.edit),
                                onPressed: () {
                                  showDialog(
                                      context: context,
                                      builder: (_) => AlertDialog(
                                          title: Column(
                                            children: [
                                              Text('Update Grievance Status'),
                                             // Text('Current Status : ' + widget.grievances[index].status)
                                            ],
                                          ),
                                          content: DropdownButton<String>(
            value: widget.grievances[index].status,
            onChanged: (String Value) {
              setState(() {
                widget.grievances[index].status = Value;
                DummyData.updateGrievanceStatus(Value);
                    var snackBar = SnackBar(content: Text('Grievance success updated Succesfully!'));
                                ScaffoldMessenger.of(context).showSnackBar(snackBar);
                                Navigator.pop(context);
              });
            },
            items: ["Unresolved","Partially Resolved", "Resolved"].map((String user) {
              return  DropdownMenuItem<String>(
                value: user,
                child: Text(user)
              );
            }).toList(),
          ),));
                                },
                              )
                            ],
                          ),
                          new SizedBox(
                            height: 8.0,
                          ),
                          new Text('Category: ' + widget.grievances[index].category,
                              textScaleFactor: 1.25),
                          new SizedBox(
                            height: 8.0,
                          ),
                          new Text(widget.grievances[index].issue,
                              textScaleFactor: 1.25),
                          new SizedBox(
                            height: 8.0,
                          ),
                          new ElevatedButton(
                            onPressed: () {},
                            child: Text(widget.grievances[index].status),
                            style: ElevatedButton.styleFrom(
                              primary:
                                  (widget.grievances[index].status == "Unresolved")
                                      ? Colors.red[200]
                                      : (widget.grievances[index].status ==
                                              "Partially Resolved"
                                          ? Colors.black12
                                          : Colors.green[200]),
                              shape: RoundedRectangleBorder(
                                borderRadius:
                                    BorderRadius.circular(12), // <-- Radius
                              ),
                            ),
                          ),
                          // new Text('Status: ' + snapshot.data[index].status,
                          //     textScaleFactor: 1.25),
                          new SizedBox(
                            height: 8.0,
                          ),
                          new ElevatedButton(
                            onPressed: () {},
                            child: Text('View PDF'),
                            style: ElevatedButton.styleFrom(
                              shape: RoundedRectangleBorder(
                                borderRadius:
                                    BorderRadius.circular(12), // <-- Radius
                              ),
                            ),
                          ),
                          new ElevatedButton(
                            onPressed: () {
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) =>
                                          GrievanceTimeline()));
                            },
                            child: Text('View Follow upHistory'),
                            style: ElevatedButton.styleFrom(
                              shape: RoundedRectangleBorder(
                                borderRadius:
                                    BorderRadius.circular(12), // <-- Radius
                              ),
                            ),
                          )
                        ],
                      ),
                    ),
                  );
                },
              )
           
    ));
  }
}
