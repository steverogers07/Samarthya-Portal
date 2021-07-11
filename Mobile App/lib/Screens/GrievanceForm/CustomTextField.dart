import 'package:flutter/material.dart';

class CustomTextField extends StatefulWidget {
  String labelText;
  String hintText;
  CustomTextField(this.labelText, [this.hintText=""]);
  @override
  _CustomTextFieldState createState() => _CustomTextFieldState();
}

class _CustomTextFieldState extends State<CustomTextField> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding:
          const EdgeInsets.only(left: 8.0, right: 8.0, top: 8.0, bottom: 3.0),
      child: TextFormField(
        decoration: InputDecoration(
            border: new OutlineInputBorder(
              //borderRadius: new BorderRadius.circular(15.0),
              borderSide: new BorderSide(),
            ),
            labelText: widget.labelText,
            hintText: widget.hintText),
      ),
    );
  }
}
