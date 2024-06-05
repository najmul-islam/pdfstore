import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPDF, {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import file from "../../assets/Living-in-the-Light.pdf";
import Book from "./Book";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const Books = () => {
  return (
    <section>
      <PDFViewer>
        <Document>
          <Page size="A4">
            <Text></Text>
          </Page>
        </Document>
      </PDFViewer>
      {/* {imageSrc && <img src={imageSrc} alt="Converted Image" />} */}
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam fugit
      numquam aliquid commodi est, eveniet voluptatibus sint hic asperiores
      animi accusamus! Cum, dolores molestiae obcaecati voluptatum repellendus
      natus, unde dolore, minima ut quam modi pariatur quos incidunt. Mollitia
      pariatur, molestiae itaque, facilis iure at totam magnam incidunt quaerat
      consectetur blanditiis nobis et. Esse, exercitationem dolorem! Vero
      dolorum earum doloremque atque possimus, id voluptatibus similique neque
      temporibus voluptatum aspernatur adipisci qui pariatur quaerat eum
      repellendus exercitationem quam corporis illo labore fuga saepe assumenda
      alias sint! Possimus dicta laboriosam aliquam voluptatibus dolorem iure,
      expedita rerum molestiae voluptatum harum autem minus debitis ipsum
      similique est? Dolorem, nostrum! Corrupti doloremque, officiis quam quis
      ipsam earum unde dolorem. Ratione, sint eligendi. Et architecto odit cum
      quas qui, totam incidunt unde nesciunt dolorem veritatis id culpa,
      voluptatibus voluptatem? Voluptatibus voluptatem asperiores provident quis
      amet eius, rerum odit adipisci doloremque quos praesentium excepturi enim
      id autem iusto alias soluta aliquid totam architecto! Natus nobis
      distinctio velit! Vel possimus expedita, numquam placeat perspiciatis aut,
      mollitia exercitationem, quisquam praesentium ea ad laboriosam sequi eos
      dolore adipisci! Animi, a. Laboriosam ipsam dolore eos, voluptatem
      praesentium omnis, incidunt sint nisi doloremque ad officia voluptatum
      itaque ut unde aut soluta quam optio tempora cumque ratione non
      necessitatibus sapiente. Dicta, sequi illum fugiat dolores blanditiis amet
      quas doloribus voluptate numquam nulla voluptatem repellendus magnam
      laboriosam voluptates voluptas corrupti. Porro atque perferendis hic
      minima laboriosam qui ipsam ullam nostrum, repellat sequi quibusdam
      ducimus consectetur quod in eos esse sunt distinctio dignissimos at
      excepturi delectus obcaecati fugit? Fugit veritatis nesciunt voluptatibus
      reiciendis harum excepturi necessitatibus animi quos. Asperiores
      voluptatibus eos vero temporibus totam quaerat sequi, quidem numquam rerum
      laboriosam itaque dolores distinctio eligendi adipisci obcaecati omnis
      ullam libero accusantium reprehenderit animi fuga corrupti qui. Possimus
      in obcaecati incidunt modi porro provident ipsa qui explicabo voluptatum
      veniam, consequatur molestiae tempore optio sunt quos ratione recusandae
      itaque repellat? Consequuntur et, eligendi autem nostrum dignissimos
      recusandae ea sapiente, repellendus quas facere nesciunt quo odio possimus
      assumenda! Sequi, consequatur. Quod dignissimos deserunt quisquam
      perspiciatis voluptatem id ratione aliquam nobis nostrum, quae placeat,
      fugit vitae officiis dolorem sit? Iste quidem veritatis doloribus nam
      accusantium! Tempora et sint neque aliquid cumque est non numquam placeat
      magnam commodi laboriosam inventore asperiores, laborum ex in aliquam at
      illum nulla quia pariatur. Error cupiditate et repellat velit aliquam
      magnam fugit accusamus eius, recusandae iusto delectus labore quasi aut
      inventore dignissimos dolores eligendi eaque ullam fuga quaerat libero
      possimus! Quibusdam saepe vero aperiam neque facere repellendus mollitia
      dolorum sint, quod nulla velit reiciendis possimus pariatur impedit
      blanditiis. Quae aliquam velit, ea eius atque doloribus tempora deserunt
      possimus consectetur hic, quo necessitatibus accusantium! Consectetur
      magni repellendus dolorem. Atque voluptas fugit labore, iure alias quis
      voluptatum nobis similique et aperiam doloremque, commodi illum recusandae
      fuga magni ad reiciendis libero? Ipsam voluptatum maxime distinctio
      explicabo blanditiis possimus laboriosam rerum. Illum ratione adipisci
      culpa blanditiis recusandae dolorem commodi! Ipsam enim distinctio
      delectus laudantium, quam tenetur, numquam eveniet pariatur nam fugit,
      veniam a! Eum minima doloremque enim necessitatibus accusantium rerum!
    </section>
  );
};

export default Books;
