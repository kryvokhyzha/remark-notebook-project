package com.ips.remark.domain;

import com.ips.remark.controller.mail.FeedbackSender;
import com.ips.remark.controller.viewModel.FeedbackViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackSender feedbackSender;

    public void sendFeedback(FeedbackViewModel feedbackViewModel){
        this.feedbackSender.sendFeedback(
                feedbackViewModel.getEmail(),
                feedbackViewModel.getName(),
                feedbackViewModel.getFeedback());
    }
}
