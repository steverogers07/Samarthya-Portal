import 'package:flutter/material.dart';
import 'package:team_79_cfg/Screens/Departments/GovtOfficials.dart';
import 'package:team_79_cfg/models/Department.dart';
import 'package:team_79_cfg/models/DummyData.dart';

class AllDepartments extends StatefulWidget {
  @override
  _AllDepartmentsState createState() => _AllDepartmentsState();
}

class _AllDepartmentsState extends State<AllDepartments> {
  Future<List<Department>> _getDepartments() async {
    //var data = await http.get("");

    //var jsonData = json.decode(data.body);

    List<Department> grievances = [];
    grievances = DummyData.getDepartments();

    // print(jsonData);

    return grievances;
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Departments"),
      ),
      body: Container(
        child: FutureBuilder(
          future: _getDepartments(),
          builder: (BuildContext context, AsyncSnapshot snapshot) {
            if (snapshot.data == null) {
              return Container(child: Center(child: Text("Loading...")));
            } else {
              return ListView.builder(
                itemCount: snapshot.data.length,
                itemBuilder: (BuildContext context, int index) {
                  return GestureDetector(
                    onTap: (){
                       Navigator.push(context,MaterialPageRoute(
                                       builder: (context) => GovtOfficials()),);
                    },
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: ListTile(title: Text(snapshot.data[index].title),
                      trailing: Icon(Icons.cast_for_education),
                      subtitle: Text("20 officials"),),
                    ));
                },
              );
            }
          },
        ),
      ),
    );
  }
}
