"use client";
import { Grid, Typography } from "@mui/material";
import Listing from "../../components/list";
import CustomButton from "../../components/buttons/CustomButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { getFormatedDate } from "@/app/utils/common";
import { useRouter } from "next/navigation";
const Info = ({ t }: any) => {
  const { domainInfo } = useSelector((state: any) => state.dnsSlice);
  const router = useRouter();
  return (
    <>
      <Grid container spacing={4} rowGap={2}>
        <Grid item xs={12} md={12} lg={12} sm={12} textAlign={"center"}>
          <Typography variant="h4" mt={4} gutterBottom>
            {t.domainInfo} &nbsp;
            <span style={{ color: "gray" }}>{domainInfo["domainname"]}</span>
          </Typography>
          <hr style={{ width: "42%", margin: "auto" }}></hr>
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>
        <Grid item xs={12} md={5} lg={5} sm={12} mt={4}>
          <Typography variant="h5" gutterBottom>
            {t.registerStatus}
            {" : "}
            <span style={{ color: "gray" }}>
              {domainInfo["domainstatus"]?.split(" ")[0]}
            </span>
          </Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, mt: 2 }} aria-label="simple table">
              <TableHead>
                <TableRow></TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left" valign="top">
                    {t.dates}
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1" mb={2} gutterBottom>
                      {t.createdOn}
                      &emsp;{getFormatedDate(domainInfo["creationdate"])}
                    </Typography>
                    <Typography variant="body1" mb={2} gutterBottom>
                      {t.expiresOn}
                      &emsp;&nbsp;
                      {getFormatedDate(domainInfo["registryexpirydate"])}
                    </Typography>
                    <Typography variant="body1" mb={2} gutterBottom>
                      {t.updatedOn}&emsp;
                      {getFormatedDate(domainInfo["registryexpirydate"])}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">{t.nameServers}</TableCell>
                  <TableCell align="left">
                    <Typography variant="body1" mb={2} gutterBottom>
                      {domainInfo["nameserver"]}{" "}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>

        <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>
        <Grid item xs={12} md={5} lg={5} sm={12}>
          <CustomButton
            onPress={() => router.push("/domain-status")}
            buttonText={t.back}
            style={{ borderRadius: 5, backgroundColor: "black" }}
          />
        </Grid>
        <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>
      </Grid>
    </>
  );
};
export default Info;
