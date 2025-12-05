"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Bot,
  FileCheck,
  CheckCircle2,
  Loader2,
  ChevronRight,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chat, ChatInput } from "@/ai/flows/chat";

type AnalysisStep = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "loading" | "complete";
};

type Message = {
  role: "user" | "bot";
  content: string;
};

type AgentInterfaceProps = {
  activeProject: string | null;
  startDemo: () => void;
};

const AgentInterface = ({ activeProject, startDemo }: AgentInterfaceProps) => {
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState<"results" | "steps">("results");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [steps, setSteps] = useState<AnalysisStep[]>([
    {
      id: 1,
      title: "Document Parsing",
      description: "Extracting text and tables from Proposal_v1.docx",
      status: "pending",
    },
    {
      id: 2,
      title: "Regulatory Scan (FAR/DFARS)",
      description: "Checking against latest regulations (Jan 2025)",
      status: "pending",
    },
    {
      id: 3,
      title: "Biosketch Validation",
      description: "Verifying SciENcv formatting compliance",
      status: "pending",
    },
    {
      id: 4,
      title: "Budget Analysis",
      description: "Ensuring justification page limits and cost realism",
      status: "pending",
    },
    {
      id: 5,
      title: "Report Generation",
      description: "Compiling findings into final compliance matrix",
      status: "pending",
    },
  ]);

  const isAnalysisComplete = steps[steps.length - 1].status === "complete";

  useEffect(() => {
    if (activeProject === "demo-running") {
      setActiveTab("steps");
      setMessages([]);
      const runSteps = async () => {
        setSteps((s) => s.map((step) => ({ ...step, status: "pending" })));

        for (let i = 0; i < steps.length; i++) {
          setSteps((prev) =>
            prev.map((s, idx) => (idx === i ? { ...s, status: "loading" } : s))
          );
          await new Promise((r) => setTimeout(r, 1500));
          setSteps((prev) =>
            prev.map((s, idx) => (idx === i ? { ...s, status: "complete" } : s))
          );
        }
        setMessages([
          {
            role: "bot",
            content:
              "I've completed the compliance review. The proposal scored 92%. I found one minor warning regarding the budget justification length, but all mandatory FAR clauses are present. The detailed report is available on the right.",
          },
        ]);
      };

      runSteps();
    } else if (activeProject) {
      setSteps((s) => s.map((step) => ({ ...step, status: "complete" })));
      setActiveTab("results");
      setMessages([
        {
          role: "bot",
          content:
            "I've completed the compliance review. The proposal scored 92%. I found one minor warning regarding the budget justification length, but all mandatory FAR clauses are present. The detailed report is available on the right.",
        },
      ]);
    } else {
      setMessages([]);
    }
  }, [activeProject]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isSending) return;

    const userMessage: Message = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsSending(true);

    try {
      const chatInput: ChatInput = { message: userMessage.content };
      const result = await chat(chatInput);
      const botMessage: Message = { role: "bot", content: result.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling chat flow:", error);
      const errorMessage: Message = {
        role: "bot",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      className={`bg-white flex flex-col h-full relative transition-all duration-500 ${
        activeProject ? "w-full md:w-1/2 border-r border-gray-200" : "w-full"
      }`}
    >
      <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-32" ref={scrollRef}>
        <div className="max-w-3xl mx-auto w-full">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Vendor Proposal Compliance
            </h1>
            <p className="text-gray-500 text-sm">
              {activeProject
                ? 'Analyzing "Proposal_v1.docx" against current FAR/DFARS standards.'
                : "Autonomous agent for federal procurement compliance."}
            </p>
          </div>

          {!activeProject && (
            <div className="grid grid-cols-1 gap-4 mb-8">
              <button
                onClick={startDemo}
                className="text-left border border-gray-200 rounded-xl p-5 hover:border-primary/50 hover:shadow-md hover:bg-primary/5 transition-all group bg-white"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg group-hover:bg-primary/20 transition-colors">
                    <FileCheck size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-base">
                      Analyze Proposal Compliance
                    </div>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      Upload a proposal to validate against FAR, DFARS, and
                      Solicitation requirements.
                    </p>
                  </div>
                </div>
              </button>

              <button className="text-left border border-gray-200 rounded-xl p-5 hover:border-primary/50 hover:shadow-md hover:bg-primary/5 transition-all group bg-white">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-50 text-teal-600 rounded-lg group-hover:bg-teal-100 transition-colors">
                    <Bot size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-base">
                      Update Regulatory Knowledge
                    </div>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      Agent autonomously scrapes latest Executive Orders and
                      policy updates.
                    </p>
                  </div>
                </div>
              </button>
            </div>
          )}

          {activeProject && (
            <div className="flex flex-col h-full">
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab("results")}
                  className={`pb-2 px-1 text-sm font-medium mr-6 transition-colors ${
                    activeTab === "results"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-slate-800"
                  }`}
                >
                  Results
                </button>
                <button
                  onClick={() => setActiveTab("steps")}
                  className={`pb-2 px-1 text-sm font-medium transition-colors ${
                    activeTab === "steps"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-slate-800"
                  }`}
                >
                  Analysis steps
                </button>
              </div>

              {activeTab === "steps" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {steps.map((step) => (
                    <div key={step.id} className="flex gap-3">
                      <div className="mt-1 shrink-0">
                        {step.status === "complete" && (
                          <CheckCircle2 size={18} className="text-green-600" />
                        )}
                        {step.status === "loading" && (
                          <Loader2
                            size={18}
                            className="text-primary animate-spin"
                          />
                        )}
                        {step.status === "pending" && (
                          <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300" />
                        )}
                      </div>
                      <div>
                        <div
                          className={`text-sm font-medium ${
                            step.status === "pending"
                              ? "text-gray-400"
                              : "text-slate-800"
                          }`}
                        >
                          {step.title}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isAnalysisComplete && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-lg text-sm text-green-800 flex items-center gap-2 animate-in fade-in zoom-in-95 duration-300">
                      <CheckCircle2 size={16} /> Analysis Complete. Report
                      generated.
                    </div>
                  )}
                </div>
              )}

              {activeTab === "results" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-4 ${
                        message.role === "user" ? "justify-end" : ""
                      }`}
                    >
                      {message.role === "bot" && (
                        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center shrink-0 p-1">
                          <Bot size={20} className="text-primary" />
                        </div>
                      )}
                      <div
                        className={`flex-1 max-w-xl ${
                          message.role === "user" ? "flex justify-end" : ""
                        }`}
                      >
                        <div
                          className={`p-4 rounded-2xl text-slate-800 leading-relaxed text-sm ${
                            message.role === "bot"
                              ? "bg-slate-50 border border-gray-200 rounded-tl-none"
                              : "bg-primary text-white rounded-br-none"
                          }`}
                        >
                          {message.content}
                        </div>
                        {message.role === "bot" &&
                          isAnalysisComplete &&
                          index === 0 && ( // Show buttons only under the first bot message
                            <div className="mt-2 flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs h-auto py-1.5"
                              >
                                Email to Officer
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs h-auto py-1.5"
                              >
                                Fix Budget Page
                              </Button>
                            </div>
                          )}
                      </div>
                      {message.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                          <User size={18} className="text-slate-600" />
                        </div>
                      )}
                    </div>
                  ))}
                   {isSending && (
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center shrink-0 p-1">
                        <Bot size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-slate-50 border border-gray-200 p-4 rounded-2xl rounded-tl-none text-slate-800 leading-relaxed text-sm">
                          <Loader2 size={16} className="animate-spin" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/50 backdrop-blur-sm p-4 border-t border-gray-200">
        <div className="max-w-3xl mx-auto w-full">
          <div className="relative">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={activeProject ? "Ask follow-up questions..." : "Select a compliance check to start."}
              className="w-full p-3 pr-12 text-sm resize-none bg-white min-h-[50px] shadow-sm"
              rows={1}
              disabled={!activeProject || isSending}
            />
            <div className="absolute bottom-2.5 right-2.5">
              <Button
                size="icon"
                className="h-8 w-8"
                disabled={!inputValue || isSending || !activeProject}
                onClick={handleSendMessage}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentInterface;
