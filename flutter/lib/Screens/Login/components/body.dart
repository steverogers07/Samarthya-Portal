import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:team_79_cfg/Screens/HomePage.dart';
import 'package:team_79_cfg/Screens/Login/components/background.dart';
import 'package:team_79_cfg/Screens/Signup/signup_screen.dart';
import 'package:team_79_cfg/components/already_have_an_account_acheck.dart';
import 'package:team_79_cfg/components/rounded_button.dart';
import 'package:team_79_cfg/components/rounded_input_field.dart';
import 'package:team_79_cfg/components/rounded_password_field.dart';
import 'package:http/http.dart' as http;
import 'package:team_79_cfg/models/DummyData.dart';

class Body extends StatelessWidget {
  const Body({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    final mobileController = new TextEditingController();
    final schoolIDController = new TextEditingController();
    final passwordController = new TextEditingController();

    _authenticate(String mobile, String pass) async {
      Uri myurl = Uri.parse(
          "https://codeforgood2021.herokuapp.com/samarthya/user/user_login");
      http.post(myurl,  headers: {
          'Content-type': 'application/json',
        },body: json.encode({
        "mobile": int.parse(mobile),
        "Password": pass,
      })).then((response) {
        print(response.body);
        if (response.statusCode == 201) {
          print(response.body);
        //  DummyData.SMCId = jsonDecode(response.body)["data"]["_id"];
          print(DummyData.SMCId);
          var snackBar = SnackBar(content: Text('Successfully logged in'));
          ScaffoldMessenger.of(context).showSnackBar(snackBar);
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => HomePage()),
          );
        } else {
          var snackBar = SnackBar(content: Text('Unable to Login'));
          ScaffoldMessenger.of(context).showSnackBar(snackBar);
        }
      });
    }

    return Background(
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              "LOGIN",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            SizedBox(height: size.height * 0.03),
            // SvgPicture.asset(
            //   "assets/icons/login.svg",
            //   height: size.height * 0.35,
            // ),
            SizedBox(height: size.height * 0.03),
            RoundedInputField(
              controller: mobileController,
              hintText: "Your Mobile",
              onChanged: (value) {},
            ),

            RoundedPasswordField(
              controller: passwordController,
              onChanged: (value) {},
            ),
            RoundedButton(
              text: "LOGIN",
              press: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => HomePage()),
                );
              },
            ),
            SizedBox(height: size.height * 0.03),
            AlreadyHaveAnAccountCheck(
              press: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return SignUpScreen();
                    },
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
