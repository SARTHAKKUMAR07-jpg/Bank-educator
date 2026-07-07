import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long is the course validity?",
    answer: "Most of our targeted courses come with a validity of 12 months from the date of purchase. We also offer a lifetime validity option for our Foundation Batches, giving you access until your final selection."
  },
  {
    question: "Are the classes live or recorded?",
    answer: "We provide a hybrid model. You get access to interactive Live Classes where you can ask doubts in real-time. Additionally, high-definition recordings of all live classes are uploaded within 2 hours, so you can watch them anytime, anywhere."
  },
  {
    question: "Do you provide study materials and PDFs?",
    answer: "Yes! Every class is followed by downloadable PDF notes, practice worksheets, and formula sheets. You also get access to our monthly Current Affairs magazine and daily GK capsules."
  },
  {
    question: "Is the mock test series included in the course fee?",
    answer: "Yes, if you purchase our Premium Foundation or Target batches, the complete Mock Test Series (500+ tests) is included for free. You can also purchase the test series separately."
  },
  {
    question: "How are my doubts resolved?",
    answer: "We offer 24/7 doubt support through our dedicated community portal. Additionally, our faculty conducts special live doubt-clearing sessions every weekend to address complex queries."
  },
  {
    question: "Can I watch the videos offline?",
    answer: "Absolutely. By downloading our Bank Educator mobile app, you can download video lectures and watch them later without an active internet connection."
  }
];

export function FAQSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Got a doubt? We've got answers. If you need more help, feel free to reach out to our support team.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border px-2">
              <AccordionTrigger className="text-left font-bold text-lg hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
