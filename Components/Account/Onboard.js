import React, { useEffect, useState, Fragment } from "react";
import dataHero from "data-hero";
import {
  Box,
  Stack, 
  Button,
  useToast,
  Wrap,
  WrapItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
  AccordionIcon,
  Checkbox,
} from "@chakra-ui/react";
import { toJS } from "mobx";

const Onboard = ({
  reset,
  action,
  error,
  sending,
  message,
  onBoardStaff,
  toggle,
  initial_data,
}) => {
  const toast = useToast();
  const [uid, setId] = useState();

  const [onBoarding, setOnBoarding] = useState({
    pre_contract: {
      rc: false,
      schedule: false,
      feel: false,
      birdtest: false,
      send_contract: false,
      signed_contract: false,
      emp_sheet: false,
      license_number: false,
    },
    general: {
      breakfast: false,
      tour: false,
      introduce: false,
      launch: false,
      coffee: false,
    },
    student: { icecream: false, tour: false, pair: false, cleaning: false },
    para_professional: {
      pair: false,
      shedule: false,
      laundry: false,
      clean: false,
      inventory: false,
      modalities: false,
      capture_way: false,
      mingle: false,
    },
    professional: {
      breakfast: false,
      tour: false,
      introduce: false,
      launch: false,
      coffee: false,
      team_introduction: false,
      payroll: false,
      allergies: false,
      basic: false,
      lic_info: false,
      ins_app: false,
      grp_ins: false,
      location: false,
      parking: false,
      schedule_dis: false,
      headshot_jamie: false,
      slack: false,
      snapchat: false,
      secret_buddy: false,
      lululemon: false,
      bird: false,
    },
    marketing: {
      headshot: false,
      make_posts: false,
      bios: false,
      business: false,
    },
    management_executive: {
      breakfast: false,
      tour: false,
      introduce: false,
      launch: false,
      coffee: false,
      team_introduction: false,
      payroll: false,
      allergies: false,
      basic: false,
      lic_info: false,
      ins_app: false,
      grp_ins: false,
      location: false,
      parking: false,
      schedule_dis: false,
      headshot_jamie: false,
      slack: false,
      snapchat: false,
      secret_buddy: false,
      lululemon: false,
      bird: false,
      shadowing: false,
      whole_team: false,
    },
    post_contract: {
      team_introduction: false,
      payroll: false,
      allergies: false,
      basic: false,
      lic_info: false,
      ins_app: false,
      grp_ins: false,
      location: false,
      parking: false,
      schedule_dis: false,
      headshot_jamie: false,
      slack: false,
      snapchat: false,
      secret_buddy: false,
      lululemon: false,
      bird: false,
    },
  });
  useEffect(() => {
    // const test = toJS(initial_data && initial_data.acl);
    const id = initial_data && initial_data._id;
    setId(id);
    let shouldsetOnBoarding =
      typeof initial_data !== "undefined" ? true : false;
    if (shouldsetOnBoarding) {
      const pre_contract = initial_data && initial_data.pre_contract;
      const general = initial_data && initial_data.general;
      const student = initial_data && initial_data.student;
      const para_professional = initial_data && initial_data.para_professional;
      const professional = initial_data && initial_data.professional;
      const marketing = initial_data && initial_data.marketing;
      const management_executive =
        initial_data && initial_data.management_executive;
      const post_contract = initial_data && initial_data.post_contract;
      let pc;
      let gn;
      let st;
      let pp;
      let pf;
      let mk;
      let me;
      let posc;

      pc = toJS(pre_contract);
      gn = toJS(general);
      st = toJS(student);
      pp = toJS(para_professional);
      pf = toJS(professional);
      mk = toJS(marketing);
      me = toJS(management_executive);
      posc = toJS(post_contract);
      setOnBoarding((state) => ({
        ...state,
        pre_contract: {
          rc: (pc && pc[0]  && pc[0].rc) || false,
          schedule: (pc && pc[0]  && pc[0].schedule) || false,
          feel: (pc && pc[0]  && pc[0].feel) || false,
          birdtest: (pc && pc[0]  && pc[0].birdtest) || false,
          send_contract: (pc && pc[0]  && pc[0].send_contract) || false,
          signed_contract: (pc && pc[0]  && pc[0].signed_contract) || false,
          emp_sheet: (pc && pc[0]  && pc[0].emp_sheet) || false,
          license_number: (pc && pc[0]  && pc[0].license_number) || false,
        },
        general: {
          breakfast: (gn && gn[0] && gn[0].breakfast) || false,
          tour: (gn && gn[0] && gn[0].tour) || false,
          introduce: (gn && gn[0] && gn[0].introduce) || false,
          launch: (gn && gn[0] && gn[0].launch) || false,
          coffee: (gn && gn[0] && gn[0].coffee) || false,
        },
        student: {
          icecream: (st && st[0] && st[0].icecream) || false,
          tour: (st && st[0] && st[0].tour) || false,
          pair: (st && st[0] && st[0].pair) || false,
          cleaning: (st && st[0] && st[0].cleaning) || false,
        },
        para_professional: {
          pair: (pp && pp[0] && pp[0].pair) || false,
          shedule: (pp && pp[0] && pp[0].shedule) || false,
          laundry: (pp && pp[0] && pp[0].laundry) || false,
          clean: (pp && pp[0] && pp[0].clean) || false,
          inventory: (pp && pp[0] && pp[0].inventory) || false,
          modalities: (pp && pp[0] && pp[0].modalities) || false,
          capture_way: (pp && pp[0] && pp[0].capture_way) || false,
          mingle: (pp && pp[0] && pp[0].mingle) || false,
        },
        professional: {
          breakfast: (pf && pf[0] && pf[0].breakfast) || false,
          tour: (pf && pf[0] && pf[0].tour) || false,
          introduce: (pf && pf[0] && pf[0].introduce) || false,
          launch: (pf && pf[0] && pf[0].launch) || false,
          coffee: (pf && pf[0] && pf[0].coffee) || false,

          team_introduction: (pf && pf[0] && pf[0].team_introduction) || false,
          payroll: (pf && pf[0] && pf[0].payroll) || false,
          allergies: (pf && pf[0] && pf[0].allergies) || false,
          basic: (pf && pf[0] && pf[0].basic) || false,
          lic_info: (pf && pf[0] && pf[0].lic_info) || false,
          ins_app: (pf && pf[0] && pf[0].ins_app) || false,
          grp_ins: (pf && pf[0] && pf[0].grp_ins) || false,
          location: (pf && pf[0] && pf[0].location) || false,
          parking: (pf && pf[0] && pf[0].parking) || false,
          schedule_dis: (pf && pf[0] && pf[0].schedule_dis) || false,
          headshot_jamie: (pf && pf[0] && pf[0].headshot_jamie) || false,
          slack: (pf && pf[0] && pf[0].slack) || false,
          snapchat: (pf && pf[0] && pf[0].snapchat) || false,
          secret_buddy: (pf && pf[0] && pf[0].secret_buddy) || false,
          lululemon: (pf && pf[0] && pf[0].lululemon) || false,
          bird: (pf && pf[0] && pf[0].bird) || false,
        },
        marketing: {
          headshot: (mk && mk[0] && mk[0].headshot) || false,
          make_posts: (mk && mk[0] && mk[0].make_posts) || false,
          bios: (mk && mk[0] && mk[0].bios) || false,
          business: (mk && mk[0] && mk[0].business) || false,
        },
        management_executive: {
          breakfast: (me && me[0] && me[0].breakfast) || false,
          tour: (me && me[0] && me[0].tour) || false,
          introduce: (me && me[0] && me[0].introduce) || false,
          launch: (me && me[0] && me[0].launch) || false,
          coffee: (me && me[0] && me[0].coffee) || false,
          team_introduction: (me && me[0] && me[0].team_introduction) || false,
          payroll: (me && me[0] && me[0].payroll) || false,
          allergies: (me && me[0] && me[0].allergies) || false,
          basic: (me && me[0] && me[0].basic) || false,
          lic_info: (me && me[0] && me[0].lic_info) || false,
          ins_app: (me && me[0] && me[0].ins_app) || false,
          grp_ins: (me && me[0] && me[0].grp_ins) || false,
          location: (posc && posc[0] && posc[0].location) || false,
          parking: (me && me[0] && me[0].parking) || false,
          schedule_dis: (me && me[0] && me[0].schedule_dis) || false,
          headshot_jamie: (me && me[0] && me[0].headshot_jamie) || false,
          slack: (me && me[0] && me[0].slack) || false,
          snapchat: (me && me[0] && me[0].snapchat) || false,
          secret_buddy: (me && me[0] && me[0].secret_buddy) || false,
          lululemon: (me && me[0] && me[0].lululemon) || false,
          bird: (me && me[0] && me[0].bird) || false,
          shadowing: (me && me[0] && me[0].shadowing) || false,
          whole_team: (me && me[0] && me[0].whole_team) || false,
        },
        post_contract: {
          team_introduction: (posc && posc[0] && posc[0].team_introduction) || false,
          payroll: (posc && posc[0] && posc[0].payroll) || false,
          allergies: (posc && posc[0] && posc[0].allergies) || false,
          basic: (posc && posc[0] && posc[0].basic) || false,
          lic_info: (posc && posc[0] && posc[0].lic_info) || false,
          ins_app: (posc && posc[0] && posc[0].ins_app) || false,
          grp_ins: (posc && posc[0] && posc[0].grp_ins) || false,
          location: (posc && posc[0] && posc[0].location) || false,
          parking: (posc && posc[0] && posc[0].parking) || false,
          schedule_dis: (posc && posc[0] && posc[0].schedule_dis) || false,
          headshot_jamie: (posc && posc[0] && posc[0].headshot_jamie) || false,
          slack: (posc && posc[0] && posc[0].slack) || false,
          snapchat: (posc && posc[0] && posc[0].snapchat) || false,
          secret_buddy: (posc && posc[0] && posc[0].secret_buddy) || false,
          lululemon: (posc && posc[0] && posc[0].lululemon) || false,
          bird: (posc && posc[0] && posc[0].bird) || false,
        },
      }));
    }
  }, [initial_data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      onBoarding,
      id: uid,
    };
    onBoardStaff(data);
  };
  const handleChange = (event, field) => {
    event.persist();
    setOnBoarding((formState) => ({
      ...formState,
      [field]: {
        ...formState[field],
        [event.target.name]: event.target.checked,
      },
    }));
  };

  useEffect(() => {
    if (action === "onBoard") {
      toast({
        title: "Server Response.",
        description: message,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      resetForm();
      toggle("onboard");
    }
    return () => {
      reset("saved", false);
      reset("message", "");
      resetForm();
      toggle("onboard");
    };
  }, [action]);

  useEffect(() => {
    if (error === true && action === "onBoardError") {
      toast({
        title: "Server Response.",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
    return () => {
      reset("error", false);
      reset("message", "");
      resetForm();
      toggle("onboard");
    };
  }, [error]);

  const resetForm = () => {
    setOnBoarding((prev) => ({
      ...prev,
      pre_contract: {
        rc: false,
        schedule: false,
        feel: false,
        birdtest: false,
        send_contract: false,
        signed_contract: false,
        emp_sheet: false,
        license_number: false,
      },
      general: {
        breakfast: false,
        tour: false,
        introduce: false,
        launch: false,
        coffee: false,
      },
      student: { icecream: false, tour: false, pair: false, cleaning: false },
      para_professional: {
        pair: false,
        shedule: false,
        laundry: false,
        clean: false,
        inventory: false,
        modalities: false,
        capture_way: false,
        mingle: false,
      },
      professional: {
        breakfast: false,
        tour: false,
        introduce: false,
        launch: false,
        coffee: false,
        team_introduction: false,
        payroll: false,
        allergies: false,
        basic: false,
        lic_info: false,
        ins_app: false,
        grp_ins: false,
        location: false,
        parking: false,
        schedule_dis: false,
        headshot_jamie: false,
        slack: false,
        snapchat: false,
        secret_buddy: false,
        lululemon: false,
        bird: false,
      },
      marketing: {
        headshot: false,
        make_posts: false,
        bios: false,
        business: false,
      },
      management_executive: {
        breakfast: false,
        tour: false,
        introduce: false,
        launch: false,
        coffee: false,
        team_introduction: false,
        payroll: false,
        allergies: false,
        basic: false,
        lic_info: false,
        ins_app: false,
        grp_ins: false,
        location: false,
        parking: false,
        schedule_dis: false,
        headshot_jamie: false,
        slack: false,
        snapchat: false,
        secret_buddy: false,
        lululemon: false,
        bird: false,
        shadowing: false,
        whole_team: false,
      },
      post_contract: {
        team_introduction: false,
        payroll: false,
        allergies: false,
        basic: false,
        lic_info: false,
        ins_app: false,
        grp_ins: false,
        location: false,
        parking: false,
        schedule_dis: false,
        headshot_jamie: false,
        slack: false,
        snapchat: false,
        secret_buddy: false,
        lululemon: false,
        bird: false,
      },
    }));
  };
  return (
    <Fragment>
      <Stack spacing="24px">
        <Stack spacing="24px">
          <Accordion>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Pre Contract
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
               <Stack>
             
              <Checkbox
                  isChecked={onBoarding.pre_contract.rc || false}
                  name="rc"
                  onChange={(event) => handleChange(event, "pre_contract")}
                >
                  {" "}
                  Resume and cover letter received
                </Checkbox>
              
               
                   <Checkbox
                  isChecked={onBoarding.pre_contract.schedule || false}
                  name="schedule"
                  onChange={(event) => handleChange(event, "pre_contract")}
                >
                Find a date that works to either works in person, on the phone,
                or virtually to meet them
                </Checkbox>
                  <Checkbox
                  isChecked={onBoarding.pre_contract.feel || false}
                  name="feel"
                  onChange={(event) => handleChange(event, "pre_contract")}
                >
                  Get a feel for them, and let them know you will get back to
                  them
                </Checkbox>
                    <Checkbox
                  isChecked={onBoarding.pre_contract.birdtest || false}
                  name="birdtest"
                  onChange={(event) => handleChange(event, "pre_contract")}
                >
                  Bird Test to be completed first time we meet them
                </Checkbox>
                 <Checkbox
                  isChecked={onBoarding.pre_contract.send_contract || false}
                  name="send_contract"
                  onChange={(event) => handleChange(event, "pre_contract")}
                >
                  Send out contract
                </Checkbox>
                   <Checkbox
                  isChecked={onBoarding.pre_contract.signed_contract || false}
                  name="signed_contract"
                  onChange={(event) => handleChange(event, "pre_contract")}
                >
                  Get signed contract
                </Checkbox>
                     <Checkbox
                  isChecked={onBoarding.pre_contract.emp_sheet || false}
                  name="emp_sheet"
                  onChange={(event) => handleChange(event, "pre_contract")}
                >
                  Send out employee sheet (send to Julie)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.pre_contract.license_number || false}
                  name="license_number"
                  onChange={(event) => handleChange(event, "pre_contract")}
                >
                  Get license numbers if applicable
                </Checkbox>
               </Stack>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    General Onboarding
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Checkbox
                  isChecked={onBoarding.general.breakfast || false}
                  name="breakfast"
                  onChange={(event) => handleChange(event, "general")}
                >
                  A breakfast Date with the CEO or meet the CEO
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.general.tour || false}
                  name="tour"
                  onChange={(event) => handleChange(event, "general")}
                >
                  A tour of both buildings by a current employee
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.general.introduce || false}
                  name="introduce"
                  onChange={(event) => handleChange(event, "general")}
                >
                  Introduce new team member to the rest of the crew in person
                  (for those that are there)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.general.launch || false}
                  name="launch"
                  onChange={(event) => handleChange(event, "general")}
                >
                  Lunch with a group of people- we can select a few and send
                  them for lunch
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.general.coffee || false}
                  name="coffee"
                  onChange={(event) => handleChange(event, "general")}
                >
                  Coffee Cup prior to arrival and desk set up for them (if
                  applicable)
                </Checkbox>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Student Onboarding
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Checkbox
                  isChecked={onBoarding.student.icecream || false}
                  name="icecream"
                  onChange={(event) => handleChange(event, "student")}
                >
                  An ice cream/ tims date with one of the staff members
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.student.tour || false}
                  name="tour"
                  onChange={(event) => handleChange(event, "student")}
                >
                  Tour of the clinic that they are working at
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.student.pair || false}
                  name="pair"
                  onChange={(event) => handleChange(event, "student")}
                >
                  Pair with a Para- Professional to train in the back
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.student.cleaning || false}
                  name="cleaning"
                  onChange={(event) => handleChange(event, "student")}
                >
                  Depending on Saturdays, the student will need to spend a day
                  of cleaning with another student
                </Checkbox>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Para professional
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
              <Stack>
                 <Checkbox
                  isChecked={onBoarding.para_professional.pair || false}
                  name="pair"
                  onChange={(event) => handleChange(event, "para_professional")}
                >
                  Pair with another team member to give them an additional tour,
                  as well as,shadowing them for a couple days to learn how we
                  work
                </Checkbox>
                <Text mb={2} textAlign="left" fontWeight="bolder">Show them how;</Text>
                <Checkbox
                  isChecked={onBoarding.para_professional.shedule || false}
                  name="shedule"
                  onChange={(event) => handleChange(event, "para_professional")}
                >
                  Scheduling system works (with Ipad)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.para_professional.laundry || false}
                  name="laundry"
                  onChange={(event) => handleChange(event, "para_professional")}
                >
                  Laundry System
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.para_professional.clean || false}
                  name="clean"
                  onChange={(event) => handleChange(event, "para_professional")}
                >
                  How to clean/prepare rooms
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.para_professional.inventory || false}
                  name="inventory"
                  onChange={(event) => handleChange(event, "para_professional")}
                >
                  Inventory storage
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.para_professional.modalities || false}
                  name="modalities"
                  onChange={(event) => handleChange(event, "para_professional")}
                >
                  How to use modalities
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.para_professional.capture_way || false}
                  name="capture_way"
                  onChange={(event) => handleChange(event, "para_professional")}
                >
                  The capture way of doing things
                </Checkbox>
                </Stack>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Professional
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
              <Stack>
                <Checkbox
                  isChecked={onBoarding.professional.breakfast || false}
                  name="breakfast"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  A breakfast Date with the CEO or meet the CEO
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.professional.tour || false}
                  name="tour"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  A tour of both buildings by a current employee
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.professional.introduce || false}
                  name="introduce"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  Introduce new team member to the rest of the crew in person
                  (for those that are there)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.professional.launch || false}
                  name="launch"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  Lunch with a group of people- we can select a few and send
                  them for lunch
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.professional.coffee || false}
                  name="coffee"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  Coffee Cup prior to arrival and desk set up for them (if
                  applicable)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.professional.team_introduction || false}
                  name="team_introduction"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  Introduction to the Team
                </Checkbox>
                <Text  textAlign="left" fontWeight="bolder"mb={2}>Employee Sheet sent out by Julie</Text>
                <Checkbox
                  isChecked={onBoarding.professional.payroll || false}
                  name="payroll"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  Payroll information
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.professional.allergies || false}
                  name="allergies"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  Allergies
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.professional.basic || false}
                  name="basic"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  All basic information
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.professional.lic_info || false}
                  name="lic_info"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  License information if applicable (Professional certificates
                  or insurance etc.)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.professional.ins_app || false}
                  name="ins_app"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  Insurance application for direct deposit have it
                  signed(Professional)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.professional.grp_ins || false}
                  name="grp_ins"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  Add to Group insurance after 3 months (Full time)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.professional.location || false}
                  name="location"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  Key for location (s), Code etc and which door to enter etc.
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.professional.parking || false}
                  name="parking"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  Parking (depending on the location)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.professional.schedule_dis || false}
                  name="schedule_dis"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  Schedule Discussion
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.professional.headshot_jamie || false}
                  name="headshot_jamie"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  Headshot with Jamie Bard (or the closest location)- Marketing
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.professional.slack || false}
                  name="slack"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  Slack Welcome
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.professional.snapchat || false}
                  name="snapchat"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  Snapchat Welcome
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.professional.secret_buddy || false}
                  name="secret_buddy"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  Secret Buddy & Added to a team for Dashboards (depending on
                  how far the next team meeting is)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.professional.lululemon || false}
                  name="lululemon"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  Lululemon Sizing and ordering (Students- 1 shirt, Para and
                  Professionals 2 shirts and a sweater)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.professional.bird || false}
                  name="bird"
                  onChange={(event) => handleChange(event, "professional")}
                >
                  Bird Testing should of been done, if preliminary in person
                  meeting- if not it needs to be done and added to the frames
                </Checkbox>
                </Stack>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Marketing
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
              <Stack>
                <Checkbox
                  isChecked={onBoarding.marketing.headshot || false}
                  name="headshot"
                  onChange={(event) => handleChange(event, "marketing")}
                >
                  Headshot for professionals or students (arrange with Jamie)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.marketing.make_posts || false}
                  name="make_posts"
                  onChange={(event) => handleChange(event, "marketing")}
                >
                  Make posts- if applicable to professionals
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.marketing.bios || false}
                  name="bios"
                  onChange={(event) => handleChange(event, "marketing")}
                >
                  Get Bios of professionals
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.marketing.business || false}
                  name="business"
                  onChange={(event) => handleChange(event, "marketing")}
                >
                  Business Cards? If applicable
                </Checkbox>
                </Stack>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Management Executive
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
              <Stack>
                   <Checkbox
                  isChecked={onBoarding.management_executive.breakfast || false}
                  name="breakfast"
                  onChange={(event) =>
                    handleChange(event, "management_executive")
                  }
                >
                  A breakfast Date with the CEO or meet the CEO
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.management_executive.tour || false}
                  name="tour"
                  onChange={(event) =>
                    handleChange(event, "management_executive")
                  }
                >
                  A tour of both buildings by a current employee
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.management_executive.introduce || false}
                  name="introduce"
                  onChange={(event) =>
                    handleChange(event, "management_executive")
                  }
                >
                  Introduce new team member to the rest of the crew in person
                  (for those that are there)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.management_executive.launch || false}
                  name="launch"
                  onChange={(event) =>
                    handleChange(event, "management_executive")
                  }
                >
                  Lunch with a group of people- we can select a few and send
                  them for lunch
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.management_executive.coffee || false}
                  name="coffee"
                  onChange={(event) =>
                    handleChange(event, "management_executive")
                  }
                >
                  Coffee Cup prior to arrival and desk set up for them (if
                  applicable)
                </Checkbox>
                <Checkbox
                  isChecked={
                    onBoarding.management_executive.team_introduction || false
                  }
                  name="team_introduction"
                  onChange={(event) =>
                    handleChange(event, "management_executive")
                  }
                >
                  Introduction to the Team
                </Checkbox>
                <Text  textAlign="left" fontWeight="bolder"mb={2}>Employee Sheet sent out by Julie</Text>
                <Checkbox
                  isChecked={onBoarding.management_executive.payroll || false}
                  name="payroll"
                  onChange={(event) =>
                    handleChange(event, "management_executive")
                  }
                >
                  Payroll information
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.management_executive.allergies || false}
                  name="allergies"
                  onChange={(event) =>
                    handleChange(event, "management_executive")
                  }
                >
                  Allergies
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.management_executive.basic || false}
                  name="basic"
                  onChange={(event) =>
                    handleChange(event, "management_executive")
                  }
                >
                  All basic information
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.management_executive.lic_info || false}
                  name="lic_info"
                  onChange={(event) =>
                    handleChange(event, "management_executive")
                  }
                >
                  License information if applicable (Professional certificates
                  or insurance etc.)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.management_executive.ins_app || false}
                  name="ins_app"
                  onChange={(event) =>
                    handleChange(event, "management_executive")
                  }
                >
                  Insurance application for direct deposit have it
                  signed(Professional)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.management_executive.grp_ins || false}
                  name="grp_ins"
                  onChange={(event) =>
                    handleChange(event, "management_executive")
                  }
                >
                  Add to Group insurance after 3 months (Full time)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.management_executive.location || false}
                  name="location"
                  onChange={(event) =>
                    handleChange(event, "management_executive")
                  }
                >
                  Key for location (s), Code etc and which door to enter etc.
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.management_executive.parking || false}
                  name="parking"
                  onChange={(event) =>
                    handleChange(event, "management_executive")
                  }
                >
                  Parking (depending on the location)
                </Checkbox>
                <Checkbox
                  isChecked={
                    onBoarding.management_executive.schedule_dis || false
                  }
                  name="schedule_dis"
                  onChange={(event) =>
                    handleChange(event, "management_executive")
                  }
                >
                  Schedule Discussion
                </Checkbox>
                <Checkbox
                  isChecked={
                    onBoarding.management_executive.headshot_jamie || false
                  }
                  name="headshot_jamie"
                  onChange={(event) =>
                    handleChange(event, "management_executive")
                  }
                >
                  Headshot with Jamie Bard (or the closest location)- Marketing
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.management_executive.slack || false}
                  name="slack"
                  onChange={(event) =>
                    handleChange(event, "management_executive")
                  }
                >
                  Slack Welcome
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.post_contract.snapchat || false}
                  name="snapchat"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  Snapchat Welcome
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.post_contract.secret_buddy || false}
                  name="secret_buddy"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  Secret Buddy & Added to a team for Dashboards (depending on
                  how far the next team meeting is)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.post_contract.lululemon || false}
                  name="lululemon"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  Lululemon Sizing and ordering (Students- 1 shirt, Para and
                  Professionals 2 shirts and a sweater)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.post_contract.bird || false}
                  name="bird"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  Bird Testing should of been done, if preliminary in person
                  meeting- if not it needs to be done and added to the frames
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.management_executive.shadowing || false}
                  name="shadowing"
                  onChange={(event) =>
                    handleChange(event, "management_executive")
                  }
                >
                  Shadowing Julie or Alannah
                </Checkbox>
                <Checkbox
                  isChecked={
                    onBoarding.management_executive.whole_team || false
                  }
                  name="whole_team"
                  onChange={(event) =>
                    handleChange(event, "management_executive")
                  }
                >
                  Meet the whole team
                </Checkbox>
                </Stack>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Post Contract
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
              <Stack>
                 <Checkbox
                  isChecked={
                    onBoarding.post_contract.team_introduction || false
                  }
                  name="team_introduction"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  Introduction to the Team
                </Checkbox>

                <Text  textAlign="left" fontWeight="bolder"mb={2}>Employee Sheet sent out by Julie</Text>
                <Checkbox
                  isChecked={onBoarding.post_contract.payroll || false}
                  name="payroll"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  Payroll information
                </Checkbox>

                <Checkbox
                  isChecked={onBoarding.post_contract.allergies || false}
                  name="allergies"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  Allergies
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.post_contract.basic || false}
                  name="basic"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  All basic information
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.post_contract.lic_info || false}
                  name="lic_info"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  License information if applicable (Professional certificates
                  or insurance etc.)
                </Checkbox>

                <Checkbox
                  isChecked={onBoarding.post_contract.ins_app || false}
                  name="ins_app"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  Insurance application for direct deposit have it
                  signed(Professional)
                </Checkbox>

                <Checkbox
                  isChecked={onBoarding.post_contract.grp_ins || false}
                  name="grp_ins"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  Add to Group insurance after 3 months (Full time)
                </Checkbox>

                <Checkbox
                  isChecked={onBoarding.post_contract.location || false}
                  name="location"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  Key for location (s), Code etc and which door to enter etc.
                </Checkbox>

                <Checkbox
                  isChecked={onBoarding.post_contract.parking || false}
                  name="parking"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  Parking (depending on the location)
                </Checkbox>

                <Checkbox
                  isChecked={onBoarding.post_contract.schedule_dis || false}
                  name="schedule_dis"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  Schedule Discussion
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.post_contract.headshot_jamie || false}
                  name="headshot_jamie"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  Headshot with Jamie Bard (or the closest location)- Marketing
                </Checkbox>

                <Checkbox
                  isChecked={onBoarding.post_contract.slack || false}
                  name="slack"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  Slack Welcome
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.post_contract.snapchat || false}
                  name="snapchat"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  Snapchat Welcome
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.post_contract.secret_buddy || false}
                  name="secret_buddy"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  Secret Buddy & Added to a team for Dashboards (depending on
                  how far the next team meeting is)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.post_contract.lululemon || false}
                  name="lululemon"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  Lululemon Sizing and ordering (Students- 1 shirt, Para and
                  Professionals 2 shirts and a sweater)
                </Checkbox>
                <Checkbox
                  isChecked={onBoarding.post_contract.bird || false}
                  name="bird"
                  onChange={(event) => handleChange(event, "post_contract")}
                >
                  Bird Testing should of been done, if preliminary in person
                  meeting- if not it needs to be done and added to the frames
                </Checkbox>
                </Stack>
                    </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
        <Box mt={1} align="right">
          <Wrap spacing="20px">
            <WrapItem>
              <Button
                variant="outline"
                disabled={sending}
                mr={3}
                onClick={() => toggle("onboard")}
              >
                Cancel
              </Button>
            </WrapItem>
            <WrapItem>
              <Button
                disabled={sending}
                colorScheme="blue"
                onClick={handleSubmit}
                isLoading={sending}
                bg="brand.mainAccent"
                color="brand.white"
                variant="ghost"
                _hover={{
                  borderColor: "brand.mainAccent",
                  bg: "brand.white",
                  color: "brand.mainAccent",
                  boxShadow: "md",
                }}
                _focus={{}}
              >
                Save Account
              </Button>
            </WrapItem>
          </Wrap>
        </Box>
      </Stack>
    </Fragment>
  );
};

export default Onboard;
