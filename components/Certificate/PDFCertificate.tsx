import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";
import { APP_NAME, BASE_URL } from "config";
import { ICertificate } from "models/certificate.model";
import React from "react";

const technical_skills: string[] = ["HTML", "CSS", "JavaScript"];
const soft_skills: string[] = ["Teamwork", "Communication", "Time Management"];

Font.register({
  family: "techathonRegular",
  src: "/fonts/Geomanist-Regular.woff",
});
Font.register({
  family: "techathonMedium",
  src: "/fonts/Geomanist-Medium.woff",
});

const styles = StyleSheet.create({
  page: {
    position: "relative",
  },
  bg: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
  },
  container: {
    padding: 48,
    paddingBottom: 8,
  },
  information: {
    marginBottom: 8,
    marginTop: 15,
  },
  logo: {
    width: 180,
  },
  heading1: {
    fontFamily: "techathonMedium",
    fontSize: 50,
    color: "#32376F",
    marginBottom: 8,
  },
  heading2: {
    fontFamily: "techathonMedium",
    fontSize: 30,
    color: "#32376F",
    marginBottom: 8,
  },
  heading3: {
    fontFamily: "techathonRegular",
    color: "#32376F",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: -5,
  },
  heading4: {
    textDecoration: "underline",
  },
  text: {
    fontFamily: "techathonRegular",
    color: "#32376F",
    fontSize: 18,
    marginBottom: 8,
  },
  text2: {
    fontSize: 16,
    marginBottom: 3,
  },
  skills: {
    maxWidth: "75%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  skillText: {
    fontSize: 16,
  },
  signers: {
    maxWidth: "85%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signerWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  signerName: {
    fontFamily: "techathonMedium",
    fontSize: 19,
  },
  signerPost: {
    fontSize: 16,
  },
  signature: {
    width: 90,
  },
  link: {
    color: "#986DF6",
  },
});
interface PDFCertificateProps extends ICertificate {}
const PDFCertificate = (props: PDFCertificateProps) => {
  const { fullName, menteeID, track, dateIssued } = props;
  return (
    <Document
      title={`${APP_NAME}_${fullName
        .toLowerCase()
        .split(" ")
        .join("_")}_certificate`}
      creator={APP_NAME}
    >
      <Page size="A4" orientation="landscape">
        <Image style={styles.bg} src="/techathon_certificate_cover.jpg" />
        <View style={styles.container}>
          <Image style={styles.logo} src="/logo.png" />
          <View style={styles.information}>
            <Text style={styles.heading1}>Certificate of Completion</Text>
            <Text style={styles.text}>This is to Certify that</Text>
            <Text style={styles.heading2}>{fullName}</Text>
            <Text style={styles.text}>has successfully completed</Text>
            <Text style={styles.heading2}>{track}</Text>
            <Text style={styles.heading3}>The Programme includes</Text>
          </View>
          <View style={styles.skills}>
            <View>
              <Text style={[styles.text, styles.heading4]}>
                Technical Skills
              </Text>
              {technical_skills.map((skill) => (
                <Text style={[styles.text, styles.skillText]}>{skill}</Text>
              ))}
            </View>
            <View>
              <Text style={[styles.text, styles.heading4]}>Soft Skills</Text>
              {soft_skills.map((skill) => (
                <Text style={[styles.text, styles.skillText]}>{skill}</Text>
              ))}
            </View>
          </View>
          <View style={styles.signers}>
            <View style={styles.signerWrapper}>
              <Image src="/signature_founder.png" style={styles.signature} />
              <Text style={[styles.text, styles.signerName]}>
                Onyearizo Wisdom
              </Text>
              <Text style={[styles.text, styles.signerPost]}>
                Founder/CEO, Techathon Community
              </Text>
            </View>
            <View style={styles.signerWrapper}>
              <Image src="/signature_manager.png" style={styles.signature} />
              <Text style={[styles.text, styles.signerName]}>Nkejah Ruth</Text>
              <Text style={[styles.text, styles.signerPost]}>
                Learning Manager, Techathon Community
              </Text>
            </View>
          </View>
          <View>
            <Text style={[styles.text, styles.text2, { textAlign: "right" }]}>
              <Text style={{ fontFamily: "techathonMedium" }}>Issued On:</Text>{" "}
              {dateIssued}
            </Text>
          </View>
          <Text style={[styles.text, { fontSize: 14, marginTop: 5 }]}>
            Verify this Proof of Completion by visiting{" "}
            <Text style={styles.link}>{`${BASE_URL}/${menteeID}`}</Text>
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFCertificate;
