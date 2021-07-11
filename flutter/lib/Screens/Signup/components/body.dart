import 'package:flutter/material.dart';
import 'package:team_79_cfg/Screens/HomePage.dart';
import 'package:team_79_cfg/Screens/Login/login_screen.dart';
import 'package:team_79_cfg/Screens/Signup/components/background.dart';
import 'package:team_79_cfg/Screens/Signup/components/or_divider.dart';
import 'package:team_79_cfg/components/already_have_an_account_acheck.dart';
import 'package:team_79_cfg/components/rounded_button.dart';
import 'package:team_79_cfg/components/rounded_input_field.dart';
import 'package:team_79_cfg/components/rounded_password_field.dart';
import 'package:team_79_cfg/components/rounded_phone_field.dart';
import 'package:team_79_cfg/components/rounded_school_field.dart';
import 'package:team_79_cfg/models/DummyData.dart';
import 'package:team_79_cfg/models/User.dart';

class Body extends StatefulWidget {

  @override
  _BodyState createState() => _BodyState();
}

class _BodyState extends State<Body> {
  final nameController = new TextEditingController();
  final emailController = new TextEditingController();
  final phoneController = new TextEditingController();
  final passwordController = new TextEditingController();
  final schoolIDController = new TextEditingController();
  final schoolNameController = new TextEditingController();
  final schoolRegionController = new TextEditingController();
 @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Background(
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              "SIGNUP",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            SizedBox(height: size.height * 0.03),
            RoundedInputField(
              controller: nameController,
              hintText: "Name",
              onChanged: (value) {},
            ),

            RoundedInputField(
              controller: emailController,
              hintText: "Email",
              onChanged: (value) {},
            ),
            RoundedPhoneField(
              controller: phoneController,
              hintText: "Phone",
              onChanged: (value) {},
            ),
            RoundedPasswordField(
              controller: passwordController,
              onChanged: (value) {},
            ),
            RoundedSchoolField(
              controller: schoolIDController,
              hintText: "School ID",
              onChanged: (value) {},
            ),
            RoundedSchoolField(
              controller: schoolNameController,
              hintText: "School Name",
              onChanged: (value) {},
            ),
            RoundedSchoolField(
              controller: schoolRegionController,
              hintText: "School Region",
              onChanged: (value) {},
            ),
            RoundedButton(
              text: "SIGNUP",
              press: () {
               DummyData.signUp(User(
                  nameController.text,
                  emailController.text,
                  passwordController.text,
                  "SMC",
                  int.parse(phoneController.text),
                  schoolIDController.text,
                  schoolNameController.text,
                  schoolRegionController.text
                )).then((response)=>print(response));
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => HomePage()),
                );
              },
            ),
            SizedBox(height: size.height * 0.03),
            AlreadyHaveAnAccountCheck(
              login: false,
              press: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return LoginScreen();
                    },
                  ),
                );
              },
            ),
            //  OrDivider(),
          ],
        ),
      ),
    );
  }
}
