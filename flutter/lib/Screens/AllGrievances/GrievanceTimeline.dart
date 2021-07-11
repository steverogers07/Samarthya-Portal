import 'package:flutter/material.dart';
import 'package:team_79_cfg/models/GrievanceTimelineModel.dart';
import 'package:timelines/timelines.dart';

class GrievanceTimeline extends StatefulWidget {
  @override
  _GrievanceTimelineState createState() => _GrievanceTimelineState();
}

class _GrievanceTimelineState extends State<GrievanceTimeline> {
  List<GrievanceTimelineModel> history = [
    GrievanceTimelineModel(DateTime.now(),"Posted grievance"),
    GrievanceTimelineModel(DateTime.now(),"Follow up via email"),
    GrievanceTimelineModel(DateTime.now(),"Escalated to higher authorities"),
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Follow up history"),
      ),
      body : Timeline.tileBuilder(
        builder: TimelineTileBuilder.fromStyle(
          contentsAlign: ContentsAlign.alternating,
          contentsBuilder: (context, index) => Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              children: [
                Text('${history[index].date.toString()}'),
                Text('${history[index].description.toString()}')
              ],
            ),
          ),
          itemCount: history.length,
        ),
      ),
    );
  }
}