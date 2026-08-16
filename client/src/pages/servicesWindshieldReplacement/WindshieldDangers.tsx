import { IMAGES } from "@/assets";
import { TextImageRowColumns } from "@/components";
import { useScreenSize } from "@/hooks";

export const WindshieldDangers = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <TextImageRowColumns
      reverse={sizeUnder.md}
      header="The Dangers of a Damaged Windshield"
      body={[
        `Driving with a cracked or broken windshield can pose serious safety
          risks. Even small cracks can compromise the structural integrity of
          your vehicle's glass, leaving you vulnerable to injury in the event of
          an accident. Moreover, windshields play a crucial role in maintaining
          clear visibility and protecting occupants from debris. A damaged
          windshield can limit your field of view, making it more challenging to
          navigate roads safely.`,
        `At Vision Glass, we understand the importance of prioritizing road
          safety. That's why we're committed to providing expert auto glass
          repair and replacement services. Our experienced technicians use only
          the highest-quality materials and state-of-the-art technology to
          ensure that your windshield is restored to its original condition,
          without compromise on quality or safety. By trusting us with your
          windshield needs, you can enjoy a safer driving experience and peace
          of mind on the road.`,
      ]}
      slantedImageSrc={IMAGES.SlantedCrackedWindshield}
      slantedImageAlt="Cracked Windshield"
    />
  );

  // return (
  //   <Stack
  //     direction={"row"}
  //     sx={{
  //       paddingInline: 8,
  //     }}
  //     spacing={4}
  //   >
  //     <Stack
  //       sx={{
  //         flex: 1,
  //         alignItems: "center",
  //         paddingBlock: 16,
  //       }}
  //       spacing={2}
  //     >
  //       <THeading align="center">The Dangers of a Damaged Windshield</THeading>
  //       <TBody>
  //         Driving with a cracked or broken windshield can pose serious safety
  //         risks. Even small cracks can compromise the structural integrity of
  //         your vehicle's glass, leaving you vulnerable to injury in the event of
  //         an accident. Moreover, windshields play a crucial role in maintaining
  //         clear visibility and protecting occupants from debris. A damaged
  //         windshield can limit your field of view, making it more challenging to
  //         navigate roads safely.
  //       </TBody>

  //       <TBody>
  //         At Vision Glass, we understand the importance of prioritizing road
  //         safety. That's why we're committed to providing expert auto glass
  //         repair and replacement services. Our experienced technicians use only
  //         the highest-quality materials and state-of-the-art technology to
  //         ensure that your windshield is restored to its original condition,
  //         without compromise on quality or safety. By trusting us with your
  //         windshield needs, you can enjoy a safer driving experience and peace
  //         of mind on the road.
  //       </TBody>
  //     </Stack>

  //     <SlantedImageShape
  //       imageSrc={IMAGES.SlantedCrackedWindshield}
  //       alt="Cracked Windshield"
  //     />
  //   </Stack>
  // );
};
