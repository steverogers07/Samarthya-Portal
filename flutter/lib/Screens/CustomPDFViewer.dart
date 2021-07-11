import 'dart:io';

import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:syncfusion_flutter_pdfviewer/pdfviewer.dart';
import 'package:flutter_full_pdf_viewer/flutter_full_pdf_viewer.dart';
import 'package:team_79_cfg/components/rounded_button.dart';

class CustomPDFViewer extends StatefulWidget {
  String path;
  CustomPDFViewer(this.path);
  @override
  _PDFViewerState createState() => _PDFViewerState();
}

class _PDFViewerState extends State<CustomPDFViewer> {
  bool _isLoading = true;
  int pages = 1;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return PDFViewerScaffold(
        appBar: AppBar(
          leading: IconButton(
            icon: Icon(Icons.arrow_back),
            onPressed: () {
              Navigator.pop(context);
            },
          ),
          title: const Text('View PDF'),
        ),
        path: widget.path);
  }
}
