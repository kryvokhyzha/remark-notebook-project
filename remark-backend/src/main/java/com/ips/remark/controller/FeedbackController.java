package com.ips.remark.controller;


import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.ips.remark.controller.viewModel.FeedbackViewModel;
import com.ips.remark.controller.mail.*;

import javax.validation.ValidationException;



@RestController
@RequestMapping("/api/feedback")
@CrossOrigin
public class FeedbackController {
    private FeedbackSender feedbackSender;

    public FeedbackController(FeedbackSender feedbackSender) {
        this.feedbackSender = feedbackSender;
    }

    @PostMapping
    public void sendFeedback(@RequestBody FeedbackViewModel feedbackViewModel,
                             BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new ValidationException("Feedback has errors; Can not send feedback;");
        }

        this.feedbackSender.sendFeedback(
                feedbackViewModel.getEmail(),
                feedbackViewModel.getName(),
                feedbackViewModel.getFeedback());
    }
}
