package com.ips.remark.controller.mail;

public interface FeedbackSender {
    void sendFeedback(String from, String name, String feedback);
}
