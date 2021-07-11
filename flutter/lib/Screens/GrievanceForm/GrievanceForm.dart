import 'package:ext_storage/ext_storage.dart';
import 'package:flutter/material.dart';
import 'package:multi_select_flutter/dialog/multi_select_dialog_field.dart';
import 'package:multi_select_flutter/multi_select_flutter.dart';
import 'package:path_provider/path_provider.dart';
import 'package:pdf/pdf.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:team_79_cfg/Screens/CustomPDFViewer.dart';
import 'package:team_79_cfg/Screens/GrievanceForm/CustomTextField.dart';
import 'package:team_79_cfg/components/rounded_button.dart';
import 'package:team_79_cfg/models/Category.dart';
import 'package:team_79_cfg/models/Department.dart';
import 'package:team_79_cfg/models/DummyData.dart';
import 'dart:io';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:printing/printing.dart';

import 'package:pdf/widgets.dart' as pw;
import 'package:team_79_cfg/models/Grievance.dart';

class GrievanceForm extends StatefulWidget {
  String title;
  File file;
  pw.Document doc;
  String path;
  String description;
  @override
  _GrievanceFormState createState() => _GrievanceFormState();
}

class _GrievanceFormState extends State<GrievanceForm> {
  List<Category> categories;
  List<Department> departments;

  List<Category> selectedCategories;
  List<Department> selectedDepartments;
  final titleController = new TextEditingController();
  final desController = new TextEditingController();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();

    this.categories = DummyData.getCategories();
    this.departments = DummyData.getDepartments();
  }

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    titleController.dispose();
    desController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final _formKey = GlobalKey<FormState>();
    return Scaffold(
      appBar: AppBar(
        title: Text("Grievance Form"),
      ),
      body: SingleChildScrollView(
        child: Container(
            child: Form(
          key: _formKey,
          child: Column(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.only(
                    left: 8.0, right: 8.0, top: 8.0, bottom: 3.0),
                child: TextField(
                  controller: titleController,
                  decoration: InputDecoration(
                      border: new OutlineInputBorder(
                        //borderRadius: new BorderRadius.circular(15.0),
                        borderSide: new BorderSide(),
                      ),
                      labelText: "Title of Grievance",
                      hintText: "Ex : Insufficient infrastructure"),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(
                    left: 8.0, right: 8.0, top: 8.0, bottom: 3.0),
                child: TextField(
                  controller: desController,
                  keyboardType: TextInputType.multiline,
                  minLines: 3,
                  maxLines: null,
                  decoration: InputDecoration(
                      border: new OutlineInputBorder(
                        //borderRadius: new BorderRadius.circular(15.0),
                        borderSide: new BorderSide(),
                      ),
                      labelText: "Description"),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: MultiSelectDialogField(
                  title: Text("Choose Category"),
                  buttonText: Text("Choose Category"),
                  items: categories
                      .map((e) => MultiSelectItem(e, e.title))
                      .toList(),
                  listType: MultiSelectListType.CHIP,
                  onConfirm: (values) {
                    this.selectedCategories = values;
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: MultiSelectDialogField(
                  title: Text("Choose Department"),
                  buttonText: Text("Choose Department"),
                  items: departments
                      .map((e) => MultiSelectItem(e, e.title))
                      .toList(),
                  listType: MultiSelectListType.CHIP,
                  onConfirm: (values) {
                    this.selectedDepartments = values;
                  },
                ),
              ),
              ElevatedButton(
                  onPressed: () {
                    generatePDF(
                        context,
                        titleController.text,
                        desController.text,
                        this.selectedCategories,
                        this.selectedDepartments);
                  },
                  child: Text("View PDF")),
              // widget.path != null
              //     ? RoundedButton(
              //         press: () {
              //           print();
              //         },
              //         text: "Print PDF")
              //     : Container(),
              widget.path != null
                  ? RoundedButton(
                      press: () {
                        DummyData.createGrievance(Grievance(
                                desController.text,
                                titleController.text,
                                this.selectedCategories[0].title,
                                this.selectedDepartments[0].title,
                                "Unresolved",
                                DummyData.SMCId,
                                DateTime.now()),widget.file)
                            .then((response){ if(response.statusCode == 201) {
                               var snackBar = SnackBar(content: Text('Grievance Submitted Succesfully!'));
                                ScaffoldMessenger.of(context).showSnackBar(snackBar);
                                Navigator.pop(context);
                            }});
                      },
                      text: "Submit")
                  : Container()
              // Add TextFormFields and ElevatedButton here.
            ],
          ),
        )),
      ),
    );
  }

  Future<void> print() async{
    
    await Printing.layoutPdf(
        onLayout: (PdfPageFormat format) async => widget.doc.save());
  }
  Future<void> downloadPDF() async {
    // storage permission ask
    // var status = await Permission.storage.status;
    // if (!status.isGranted) {
    //   await Permission.storage.request();
    // }
    // // the downloads folder path
    // String path = await ExtStorage.getExternalStoragePublicDirectory(
    //     ExtStorage.DIRECTORY_DOWNLOADS);
    String path = await getDownloadPath();
    debugPrint(path);
    var filePath = path + '/example.pdf';

    /// if rename fails, copy the source file
    final newFile = await widget.file.copy(filePath);
    return newFile;
  }

  Future<File> moveFile(File sourceFile, String newPath) async {}
  Future<String> get _localPath async {
    final directory = await getApplicationDocumentsDirectory();

    return directory.path;
  }

  Future<String> getDownloadPath() async {
    final path = await getExternalStorageDirectory();
    return path.path;
  }

  Future<void> generatePDF(BuildContext context, String description,
      String title, List<Category> categories, List<Department> depts) async {
    final pdf = pw.Document();
    pdf.addPage(
      pw.Page(
        pageFormat: PdfPageFormat.a4,
        build: (pw.Context context) => pw.Center(
          child: pw.Column(children: [
            pw.Header(
                level: 0,
                child: pw.Row(
                    mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                    children: [
                      pw.Text('Grievance Form For ' + depts[0].title + " Department", textScaleFactor: 2),
                      pw.PdfLogo()
                    ])),
            pw.Text("Dear Sir/Madam"),
            pw.Paragraph(text: "A gentle reminder of an unaddressed issue regarding " + title + 
            "I am writing this letter, requesting you to consider this letter as a matter of urgency and importance. There was a grievance filed o , which has not been addressed yet. So, considering the circumstances that have been mentioned in the letter or the actual grievance , I will greatly appreciate your consideration of this request. Please let me know about the status of the issue. " + description)
          ]),
        ),
      ),
    );

    final path = await _localPath;
    File file = File("$path/example.pdf");
    setState(() {
      widget.path = "$path/example.pdf";
    });
    debugPrint("writing to " + path);
    await file.writeAsBytes(await pdf.save());

    setState(() {
      widget.doc = pdf;
      widget.file = file;
    });

    Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) => CustomPDFViewer("$path/example.pdf")));
  }
}
