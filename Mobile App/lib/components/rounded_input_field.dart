import 'package:flutter/material.dart';
import 'package:team_79_cfg/components/text_field_container.dart';
import 'package:team_79_cfg/constants.dart';

class RoundedInputField extends StatelessWidget {
  final String hintText;
  final TextEditingController controller;
  final IconData icon;
  final ValueChanged<String> onChanged;
  RoundedInputField({
    Key key,
    this.hintText,
    this.icon = Icons.person,
    this.onChanged,
    this.controller,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFieldContainer(
      child: TextField(
        controller: controller,
        onChanged: onChanged,
        cursorColor: kPrimaryColor,
        decoration: InputDecoration(
          icon: Icon(
            icon,
            color: kPrimaryColor,
          ),
          hintText: hintText,
          border: InputBorder.none,
        ),
      ),
    );
  }
}
