package com.ips.remark.controller;


import com.ips.remark.domain.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.ips.remark.controller.viewModel.FeedbackViewModel;
import com.ips.remark.controller.mail.*;

import javax.validation.ValidationException;



@RestController
@RequestMapping("/api/feedback")
@CrossOrigin
public class FeedbackController {
    @Autowired
    FeedbackService feedbackService;

    @PostMapping
    public void sendFeedback(@RequestBody FeedbackViewModel feedbackViewModel,
                             BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException("Feedback has errors; Can not send feedback;");
        }

        feedbackService.sendFeedback(feedbackViewModel);
    }
}
